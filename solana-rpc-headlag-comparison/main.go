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

// SlotNotification represents a Solana slotSubscribe notification.
type SlotNotification struct {
	Slot   uint64 `json:"slot"`
	Parent uint64 `json:"parent"`
	Root   uint64 `json:"root"`
}

type RPCResponse struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      int             `json:"id,omitempty"`
	Result  json.RawMessage `json:"result,omitempty"`
	Method  string          `json:"method,omitempty"`
	Params  *struct {
		Subscription int             `json:"subscription"`
		Result       json.RawMessage `json:"result"`
	} `json:"params,omitempty"`
}

type SlotEvent struct {
	NodeName   string
	Slot       uint64
	Parent     uint64
	Root       uint64
	ReceivedAt time.Time
}

type NodeStats struct {
	Name           string
	TotalSlots     int
	FirstCount     int
	AvgDelayMs     float64
	LastSlot       uint64
	LastReceivedAt time.Time
	Connected      bool
	Reconnects     int
	DelaysMs       []float64
	delaySum       float64
}

type HeadlagMonitor struct {
	nodes      map[string]string // name -> ws url
	stats      map[string]*NodeStats
	slotEvents map[uint64][]SlotEvent // slot number -> events from each node
	mu         sync.RWMutex
	ctx        context.Context
	cancel     context.CancelFunc
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
		nodes:      nodes,
		stats:      stats,
		slotEvents: make(map[uint64][]SlotEvent),
		ctx:        ctx,
		cancel:     cancel,
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

	// Subscribe to slot notifications
	subscribeMsg := map[string]interface{}{
		"jsonrpc": "2.0",
		"id":      1,
		"method":  "slotSubscribe",
	}

	if err := conn.WriteJSON(subscribeMsg); err != nil {
		return fmt.Errorf("subscribe failed: %w", err)
	}

	// Read subscription confirmation
	var subResp RPCResponse
	if err := conn.ReadJSON(&subResp); err != nil {
		return fmt.Errorf("read subscription response failed: %w", err)
	}

	var subID int
	if err := json.Unmarshal(subResp.Result, &subID); err != nil {
		return fmt.Errorf("subscription failed, could not parse result: %w", err)
	}

	log.Printf("[%s] Subscribed with ID: %d", name, subID)

	// Keepalive: send pings every 30s
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

	// Read slot notifications
	for {
		select {
		case <-m.ctx.Done():
			return nil
		default:
		}

		conn.SetReadDeadline(time.Now().Add(60 * time.Second))

		var msg RPCResponse
		if err := conn.ReadJSON(&msg); err != nil {
			return fmt.Errorf("read failed: %w", err)
		}

		if msg.Method == "slotNotification" && msg.Params != nil {
			receivedAt := time.Now()

			var notification SlotNotification
			if err := json.Unmarshal(msg.Params.Result, &notification); err != nil {
				log.Printf("[%s] Failed to parse slot notification: %v", name, err)
				continue
			}

			event := SlotEvent{
				NodeName:   name,
				Slot:       notification.Slot,
				Parent:     notification.Parent,
				Root:       notification.Root,
				ReceivedAt: receivedAt,
			}

			m.recordEvent(event)
		}
	}
}

func (m *HeadlagMonitor) recordEvent(event SlotEvent) {
	m.mu.Lock()
	defer m.mu.Unlock()

	m.slotEvents[event.Slot] = append(m.slotEvents[event.Slot], event)

	stats := m.stats[event.NodeName]
	stats.TotalSlots++
	stats.LastSlot = event.Slot
	stats.LastReceivedAt = event.ReceivedAt

	// Calculate delay relative to first node that reported this slot.
	// Unlike EVM, Solana slots don't have a hash in slotSubscribe, so we
	// compare purely by slot number.
	events := m.slotEvents[event.Slot]
	var earliest time.Time
	found := false
	for _, e := range events {
		if e.NodeName != event.NodeName {
			if !found || e.ReceivedAt.Before(earliest) {
				earliest = e.ReceivedAt
				found = true
			}
		}
	}

	if !found {
		stats.FirstCount++
		m.appendDelay(stats, 0)
	} else {
		delay := event.ReceivedAt.Sub(earliest).Seconds() * 1000
		m.appendDelay(stats, delay)
	}

	// Cleanup old slot events (keep last 1000 slots)
	if len(m.slotEvents) > 1000 {
		var keys []uint64
		for k := range m.slotEvents {
			keys = append(keys, k)
		}
		sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })
		for _, k := range keys[:len(keys)-1000] {
			delete(m.slotEvents, k)
		}
	}
}

func (m *HeadlagMonitor) appendDelay(stats *NodeStats, delay float64) {
	if len(stats.DelaysMs) >= maxDelays {
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
	fmt.Printf("Solana Node Headlag Stats - %s\n", time.Now().Format("2006-01-02 15:04:05"))
	fmt.Println(strings.Repeat("=", 100))

	var nodeNames []string
	for name := range m.stats {
		nodeNames = append(nodeNames, name)
	}
	sort.Slice(nodeNames, func(i, j int) bool {
		return m.stats[nodeNames[i]].AvgDelayMs < m.stats[nodeNames[j]].AvgDelayMs
	})

	fmt.Printf("%-20s | %-9s | %-8s | %-10s | %-12s | %-12s | %-10s\n",
		"Node", "Connected", "Slots", "First (#)", "Avg Delay", "Last Slot", "Reconnects")
	fmt.Println(strings.Repeat("-", 100))

	for _, name := range nodeNames {
		s := m.stats[name]
		connStatus := "No"
		if s.Connected {
			connStatus = "Yes"
		}

		firstPct := 0.0
		if s.TotalSlots > 0 {
			firstPct = float64(s.FirstCount) / float64(s.TotalSlots) * 100
		}

		fmt.Printf("%-20s | %-9s | %-8d | %-4d (%3.0f%%) | %8.2f ms | %-12d | %-10d\n",
			truncate(name, 20),
			connStatus,
			s.TotalSlots,
			s.FirstCount,
			firstPct,
			s.AvgDelayMs,
			s.LastSlot,
			s.Reconnects,
		)
	}

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
	for name, url := range m.nodes {
		go m.subscribeToNode(name, url)
	}

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
	parts := strings.Split(u.Path, "/")
	for i, p := range parts {
		if len(p) >= 24 {
			parts[i] = "***"
		}
	}
	u.Path = strings.Join(parts, "/")
	return u.String()
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
		fmt.Println("Solana RPC Headlag Comparison Tool")
		fmt.Println("\nUsage:")
		fmt.Println("  headlag -nodes \"node1=wss://url1,node2=wss://url2\"")
		fmt.Println("\nExample:")
		fmt.Println("  go run main.go -nodes \"getblock=wss://go.getblock.io/YOUR_KEY,helius=wss://mainnet.helius-rpc.com/?api-key=YOUR_KEY\"")
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

	fmt.Printf("Starting Solana headlag monitor for %d nodes...\n", len(nodes))
	for name, wsURL := range nodes {
		fmt.Printf("  - %s: %s\n", name, maskURL(wsURL))
	}

	monitor := NewHeadlagMonitor(nodes)

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-sigChan
		fmt.Println("\nShutting down...")
		monitor.Stop()
	}()

	monitor.Start()
}
