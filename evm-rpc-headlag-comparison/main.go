package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/url"
	"os"
	"os/signal"
	"sort"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/gorilla/websocket"
)

const maxDelays = 10000

type BlockHeader struct {
	Number    string `json:"number"`
	Hash      string `json:"hash"`
	Timestamp string `json:"timestamp"`
}

type SubscriptionResponse struct {
	JSONRPC string `json:"jsonrpc"`
	ID      int    `json:"id,omitempty"`
	Result  string `json:"result,omitempty"`
	Method  string `json:"method,omitempty"`
	Params  *struct {
		Subscription string          `json:"subscription"`
		Result       json.RawMessage `json:"result"`
	} `json:"params,omitempty"`
}

type HeaderEvent struct {
	NodeName   string
	BlockNum   uint64
	BlockHash  string
	ReceivedAt time.Time
}

type NodeStats struct {
	Name           string
	TotalHeaders   int
	FirstCount     int
	AvgDelayMs     float64
	LastBlockNum   uint64
	LastBlockHash  string
	LastReceivedAt time.Time
	Connected      bool
	Reconnects     int
	DelaysMs       []float64
	delaySum       float64
}

type HeadlagMonitor struct {
	nodes       map[string]string // name -> ws url
	stats       map[string]*NodeStats
	blockEvents map[uint64][]HeaderEvent // block number -> events from each node
	mu          sync.RWMutex
	ctx         context.Context
	cancel      context.CancelFunc
}

func NewHeadlagMonitor(nodes map[string]string) *HeadlagMonitor {
	ctx, cancel := context.WithCancel(context.Background())
	stats := make(map[string]*NodeStats)
	for name := range nodes {
		stats[name] = &NodeStats{
			Name:     name,
			DelaysMs: make([]float64, 0),
		}
	}
	return &HeadlagMonitor{
		nodes:       nodes,
		stats:       stats,
		blockEvents: make(map[uint64][]HeaderEvent),
		ctx:         ctx,
		cancel:      cancel,
	}
}

func (m *HeadlagMonitor) subscribeToNode(name, wsURL string) {
	for {
		select {
		case <-m.ctx.Done():
			return
		default:
		}

		err := m.connectAndSubscribe(name, wsURL)
		if err != nil {
			log.Printf("[%s] Connection error: %v, reconnecting in 3s...", name, err)
			m.mu.Lock()
			m.stats[name].Connected = false
			m.stats[name].Reconnects++
			m.mu.Unlock()
			time.Sleep(3 * time.Second)
			continue
		}
	}
}

func (m *HeadlagMonitor) connectAndSubscribe(name, wsURL string) error {
	dialer := websocket.Dialer{
		HandshakeTimeout: 10 * time.Second,
	}

	// Add headers that some providers require
	headers := make(map[string][]string)
	headers["Origin"] = []string{"http://localhost"}

	conn, resp, err := dialer.DialContext(m.ctx, wsURL, headers)
	if err != nil {
		if resp != nil {
			return fmt.Errorf("dial failed (HTTP %d): %w", resp.StatusCode, err)
		}
		return fmt.Errorf("dial failed: %w", err)
	}
	defer conn.Close()

	m.mu.Lock()
	m.stats[name].Connected = true
	m.mu.Unlock()

	log.Printf("[%s] Connected to %s", name, maskURL(wsURL))

	// Subscribe to newHeads
	subscribeMsg := map[string]interface{}{
		"jsonrpc": "2.0",
		"id":      1,
		"method":  "eth_subscribe",
		"params":  []string{"newHeads"},
	}

	if err := conn.WriteJSON(subscribeMsg); err != nil {
		return fmt.Errorf("subscribe failed: %w", err)
	}

	// Read subscription confirmation
	var subResp SubscriptionResponse
	if err := conn.ReadJSON(&subResp); err != nil {
		return fmt.Errorf("read subscription response failed: %w", err)
	}

	if subResp.Result == "" {
		return fmt.Errorf("subscription failed, no result")
	}

	log.Printf("[%s] Subscribed with ID: %s", name, subResp.Result)

	// Keepalive: send pings every 30s, expect pong within 10s
	conn.SetPongHandler(func(string) error {
		conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})
	go func() {
		ticker := time.NewTicker(30 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-m.ctx.Done():
				return
			case <-ticker.C:
				if err := conn.WriteControl(websocket.PingMessage, nil, time.Now().Add(10*time.Second)); err != nil {
					return
				}
			}
		}
	}()

	// Read headers
	for {
		select {
		case <-m.ctx.Done():
			return nil
		default:
		}

		conn.SetReadDeadline(time.Now().Add(60 * time.Second))

		var msg SubscriptionResponse
		if err := conn.ReadJSON(&msg); err != nil {
			return fmt.Errorf("read failed: %w", err)
		}

		if msg.Method == "eth_subscription" && msg.Params != nil {
			receivedAt := time.Now()

			var header BlockHeader
			if err := json.Unmarshal(msg.Params.Result, &header); err != nil {
				log.Printf("[%s] Failed to parse header: %v", name, err)
				continue
			}

			blockNum := hexToUint64(header.Number)

			event := HeaderEvent{
				NodeName:   name,
				BlockNum:   blockNum,
				BlockHash:  header.Hash,
				ReceivedAt: receivedAt,
			}

			m.recordEvent(event)
		}
	}
}

func (m *HeadlagMonitor) recordEvent(event HeaderEvent) {
	m.mu.Lock()
	defer m.mu.Unlock()

	// Record the event
	m.blockEvents[event.BlockNum] = append(m.blockEvents[event.BlockNum], event)

	// Update node stats
	stats := m.stats[event.NodeName]
	stats.TotalHeaders++
	stats.LastBlockNum = event.BlockNum
	stats.LastBlockHash = event.BlockHash
	stats.LastReceivedAt = event.ReceivedAt

	// Calculate delay relative to first node that received this block with the same hash.
	// Matching by hash avoids counting reorg-related discrepancies as latency.
	events := m.blockEvents[event.BlockNum]
	var earliest time.Time
	found := false
	for _, e := range events {
		if e.BlockHash == event.BlockHash && e.NodeName != event.NodeName {
			if !found || e.ReceivedAt.Before(earliest) {
				earliest = e.ReceivedAt
				found = true
			}
		}
	}

	if !found {
		// First node to report this block+hash
		stats.FirstCount++
		m.appendDelay(stats, 0)
	} else {
		delay := event.ReceivedAt.Sub(earliest).Seconds() * 1000
		m.appendDelay(stats, delay)
	}

	// Cleanup old block events (keep last 1000 blocks)
	if len(m.blockEvents) > 1000 {
		var keys []uint64
		for k := range m.blockEvents {
			keys = append(keys, k)
		}
		sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })
		for _, k := range keys[:len(keys)-1000] {
			delete(m.blockEvents, k)
		}
	}
}

func (m *HeadlagMonitor) appendDelay(stats *NodeStats, delay float64) {
	if len(stats.DelaysMs) >= maxDelays {
		// Drop the oldest entry
		stats.delaySum -= stats.DelaysMs[0]
		stats.DelaysMs = stats.DelaysMs[1:]
	}
	stats.DelaysMs = append(stats.DelaysMs, delay)
	stats.delaySum += delay
	stats.AvgDelayMs = stats.delaySum / float64(len(stats.DelaysMs))
}

func (m *HeadlagMonitor) printStats() {
	m.mu.RLock()
	defer m.mu.RUnlock()

	fmt.Println("\n" + strings.Repeat("=", 100))
	fmt.Printf("EVM Node Headlag Stats - %s\n", time.Now().Format("2006-01-02 15:04:05"))
	fmt.Println(strings.Repeat("=", 100))

	// Sort nodes by average delay
	var nodeNames []string
	for name := range m.stats {
		nodeNames = append(nodeNames, name)
	}
	sort.Slice(nodeNames, func(i, j int) bool {
		return m.stats[nodeNames[i]].AvgDelayMs < m.stats[nodeNames[j]].AvgDelayMs
	})

	fmt.Printf("%-20s | %-9s | %-8s | %-10s | %-12s | %-12s | %-10s\n",
		"Node", "Connected", "Headers", "First (#)", "Avg Delay", "Last Block", "Reconnects")
	fmt.Println(strings.Repeat("-", 100))

	for _, name := range nodeNames {
		s := m.stats[name]
		connStatus := "No"
		if s.Connected {
			connStatus = "Yes"
		}

		firstPct := 0.0
		if s.TotalHeaders > 0 {
			firstPct = float64(s.FirstCount) / float64(s.TotalHeaders) * 100
		}

		fmt.Printf("%-20s | %-9s | %-8d | %-4d (%3.0f%%) | %8.2f ms | %-12d | %-10d\n",
			truncate(name, 20),
			connStatus,
			s.TotalHeaders,
			s.FirstCount,
			firstPct,
			s.AvgDelayMs,
			s.LastBlockNum,
			s.Reconnects,
		)
	}

	// Print delay percentiles for each node
	fmt.Println("\nDelay Percentiles (ms):")
	fmt.Printf("%-20s | %-10s | %-10s | %-10s | %-10s | %-10s\n",
		"Node", "P50", "P75", "P90", "P95", "P99")
	fmt.Println(strings.Repeat("-", 80))

	for _, name := range nodeNames {
		s := m.stats[name]
		if len(s.DelaysMs) > 0 {
			sorted := make([]float64, len(s.DelaysMs))
			copy(sorted, s.DelaysMs)
			sort.Float64s(sorted)

			fmt.Printf("%-20s | %10.2f | %10.2f | %10.2f | %10.2f | %10.2f\n",
				truncate(name, 20),
				percentile(sorted, 50),
				percentile(sorted, 75),
				percentile(sorted, 90),
				percentile(sorted, 95),
				percentile(sorted, 99),
			)
		}
	}

	fmt.Println(strings.Repeat("=", 100))
}

func (m *HeadlagMonitor) Start() {
	// Start subscription goroutines for each node
	for name, url := range m.nodes {
		go m.subscribeToNode(name, url)
	}

	// Print stats periodically
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-m.ctx.Done():
			return
		case <-ticker.C:
			m.printStats()
		}
	}
}

func (m *HeadlagMonitor) Stop() {
	m.cancel()
}

// maskURL hides credentials and query-string API keys from a URL.
func maskURL(rawURL string) string {
	u, err := url.Parse(rawURL)
	if err != nil {
		return rawURL
	}
	if u.User != nil {
		u.User = url.User("***")
	}
	if u.RawQuery != "" {
		u.RawQuery = "***"
	}
	// Mask the last path segment (common pattern: /v3/<api-key>)
	parts := strings.Split(u.Path, "/")
	for i, p := range parts {
		if len(p) >= 24 {
			parts[i] = "***"
		}
	}
	u.Path = strings.Join(parts, "/")
	return u.String()
}

func hexToUint64(hex string) uint64 {
	if strings.HasPrefix(hex, "0x") {
		hex = hex[2:]
	}
	var result uint64
	fmt.Sscanf(hex, "%x", &result)
	return result
}

func truncate(s string, maxLen int) string {
	if len(s) <= maxLen {
		return s
	}
	return s[:maxLen-3] + "..."
}

func percentile(sorted []float64, p float64) float64 {
	if len(sorted) == 0 {
		return 0
	}
	idx := int(float64(len(sorted)-1) * p / 100)
	return sorted[idx]
}

func main() {
	nodesFlag := flag.String("nodes", "", "Comma-separated list of node endpoints in format name=ws://url,name2=wss://url2")
	flag.Parse()

	if *nodesFlag == "" {
		fmt.Println("EVM RPC Headlag Comparison Tool")
		fmt.Println("\nUsage:")
		fmt.Println("  headlag -nodes \"node1=wss://url1,node2=wss://url2\"")
		fmt.Println("\nExample:")
		fmt.Println("  headlag -nodes \"infura=wss://mainnet.infura.io/ws/v3/KEY,alchemy=wss://eth-mainnet.g.alchemy.com/v2/KEY\"")
		os.Exit(1)
	}

	nodes := make(map[string]string)
	for _, pair := range strings.Split(*nodesFlag, ",") {
		parts := strings.SplitN(pair, "=", 2)
		if len(parts) != 2 {
			log.Fatalf("Invalid node format: %s (expected name=url)", pair)
		}
		name := strings.TrimSpace(parts[0])
		url := strings.TrimSpace(parts[1])
		nodes[name] = url
	}

	if len(nodes) < 2 {
		log.Fatal("At least 2 nodes are required for comparison")
	}

	fmt.Printf("Starting headlag monitor for %d nodes...\n", len(nodes))
	for name, wsURL := range nodes {
		fmt.Printf("  - %s: %s\n", name, maskURL(wsURL))
	}

	monitor := NewHeadlagMonitor(nodes)

	// Handle graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-sigChan
		fmt.Println("\nShutting down...")
		monitor.Stop()
	}()

	monitor.Start()
}
