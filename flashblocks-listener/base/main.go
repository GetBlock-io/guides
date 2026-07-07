// Command base listens to Base flashblocks via a GetBlock WebSocket endpoint.
//
// It connects, sends an `eth_subscribe` request for "newFlashblocks", and
// prints each flashblock notification as it arrives (~200ms apart).
//
// The GetBlock access token is read from the environment (see .env.example),
// so it is never hard-coded here. The token must be for Base (chainId 8453)
// with Flashblocks enabled — a standard Base node token will NOT stream.
package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"

	"github.com/andybalholm/brotli"
	"github.com/gorilla/websocket"
)

// chainName is used only for log output.
const chainName = "Base"

// wsHost is the GetBlock WebSocket host; only the per-token path is secret.
const wsHost = "wss://go.getblock.io/"

// Environment variable names holding the GetBlock access token per network.
// Set them in a .env file (see .env.example) — never hard-code tokens.
const (
	mainnetTokenEnv = "BASE_MAINNET_TOKEN"
	sepoliaTokenEnv = "BASE_SEPOLIA_TOKEN"
)

// subscriptionEnvelope is the JSON-RPC wrapper the node sends for each
// eth_subscription notification. The flashblock itself lives in params.result.
type subscriptionEnvelope struct {
	Method string `json:"method"`
	Params struct {
		Subscription string          `json:"subscription"`
		Result       json.RawMessage `json:"result"`
	} `json:"params"`
	// Present on the initial subscription confirmation / errors, not on notifications.
	ID     *int            `json:"id,omitempty"`
	Result json.RawMessage `json:"result,omitempty"`
	Error  *struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
		Data    string `json:"data"`
	} `json:"error,omitempty"`
}

// Flashblock is the pre-confirmation block snapshot delivered by the Base
// (GetBlock) feed. Unlike the Optimism diff format, Base sends a full block
// object in standard Ethereum JSON (camelCase, hex-encoded quantities) with
// full transaction objects. Fields like hash/stateRoot are zero while the
// block is still in progress.
type Flashblock struct {
	Number        string        `json:"number"`
	Hash          string        `json:"hash"`
	ParentHash    string        `json:"parentHash"`
	StateRoot     string        `json:"stateRoot"`
	ReceiptsRoot  string        `json:"receiptsRoot"`
	GasUsed       string        `json:"gasUsed"`
	GasLimit      string        `json:"gasLimit"`
	BaseFeePerGas string        `json:"baseFeePerGas"`
	Timestamp     string        `json:"timestamp"`
	Transactions  []Transaction `json:"transactions"`
}

// Transaction is a full transaction object embedded in the block.
type Transaction struct {
	Hash string `json:"hash"`
	From string `json:"from"`
	To   string `json:"to"`
	Type string `json:"type"`
}

// hexToUint64 parses a "0x"-prefixed hex quantity; returns 0 if empty/invalid.
func hexToUint64(s string) uint64 {
	s = strings.TrimPrefix(s, "0x")
	if s == "" {
		return 0
	}
	n, err := strconv.ParseUint(s, 16, 64)
	if err != nil {
		return 0
	}
	return n
}

// isZeroHash reports whether a hash is all zeros (block still in progress).
func isZeroHash(h string) bool {
	for _, c := range strings.TrimPrefix(h, "0x") {
		if c != '0' {
			return false
		}
	}
	return true
}

func main() {
	network := flag.String("network", "mainnet", "Network to connect to: mainnet or sepolia")
	flag.Parse()

	// Load .env from the working directory if present (optional; env vars set
	// another way still work).
	loadDotEnv(".env")

	var tokenEnv string
	switch *network {
	case "mainnet":
		tokenEnv = mainnetTokenEnv
	case "sepolia":
		tokenEnv = sepoliaTokenEnv
	default:
		log.Fatalf("Invalid network: %s. Use 'mainnet' or 'sepolia'", *network)
	}

	token := os.Getenv(tokenEnv)
	if token == "" {
		log.Fatalf("%s is not set. Copy .env.example to .env and add your GetBlock token.", tokenEnv)
	}
	wsURL := wsHost + token

	// Note: wsURL is not logged because it contains the secret token.
	log.Printf("Connecting to %s flashblocks on %s...", chainName, *network)

	conn, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
	if err != nil {
		log.Fatalf("Failed to connect to WebSocket: %v", err)
	}
	defer conn.Close()

	log.Println("Connected! Subscribing to flashblocks...")

	// The node does not stream automatically; we must subscribe first.
	subscribeMsg := `{"jsonrpc":"2.0","id":1,"method":"eth_subscribe","params":["newFlashblocks"]}`
	if err := conn.WriteMessage(websocket.TextMessage, []byte(subscribeMsg)); err != nil {
		log.Fatalf("Failed to send subscription request: %v", err)
	}

	// Handle graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	done := make(chan struct{})

	go func() {
		defer close(done)
		for {
			messageType, message, err := conn.ReadMessage()
			if err != nil {
				if websocket.IsCloseError(err, websocket.CloseNormalClosure, websocket.CloseGoingAway) {
					log.Println("WebSocket closed normally")
					return
				}
				log.Printf("Error reading message: %v", err)
				return
			}

			switch messageType {
			case websocket.TextMessage:
				handleFlashblockJSON(message)
			case websocket.BinaryMessage:
				decoded, err := decodeBrotli(message)
				if err != nil {
					log.Printf("Error decoding Brotli: %v", err)
					log.Printf("Raw binary message length: %d bytes", len(message))
					continue
				}
				handleFlashblockJSON(decoded)
			default:
				log.Printf("Received unknown message type: %d", messageType)
			}
		}
	}()

	select {
	case <-done:
		log.Println("Connection closed")
	case sig := <-sigChan:
		log.Printf("Received signal %v, shutting down...", sig)
		err := conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
		if err != nil {
			log.Printf("Error sending close message: %v", err)
		}
	}
}

func decodeBrotli(data []byte) ([]byte, error) {
	reader := brotli.NewReader(bytes.NewReader(data))
	return io.ReadAll(reader)
}

func handleFlashblockJSON(data []byte) {
	var env subscriptionEnvelope
	if err := json.Unmarshal(data, &env); err != nil {
		log.Printf("Error parsing message JSON: %v", err)
		log.Printf("Raw data: %s", string(data))
		return
	}

	// Subscription confirmation or error response (has a top-level id).
	if env.ID != nil {
		if env.Error != nil {
			log.Fatalf("Subscription failed: %s (data: %s)", env.Error.Message, env.Error.Data)
		}
		log.Printf("Subscribed to flashblocks (subscription id: %s)", string(env.Result))
		return
	}

	// Flashblock notification: the block is nested in params.result.
	if env.Method != "eth_subscription" || len(env.Params.Result) == 0 {
		return
	}

	var flashblock Flashblock
	if err := json.Unmarshal(env.Params.Result, &flashblock); err != nil {
		log.Printf("Error parsing flashblock JSON: %v", err)
		log.Printf("Raw data: %s", string(env.Params.Result))
		return
	}

	printFlashblock(&flashblock)
}

func printFlashblock(fb *Flashblock) {
	hash := truncateHash(fb.Hash)
	if isZeroHash(fb.Hash) {
		hash = "(pending)"
	}

	fmt.Println("═══════════════════════════════════════════════════════════════")
	fmt.Printf("FLASHBLOCK | Block: %d | Hash: %s\n", hexToUint64(fb.Number), hash)
	fmt.Println("═══════════════════════════════════════════════════════════════")

	fmt.Printf("  Gas Used:       %d\n", hexToUint64(fb.GasUsed))
	fmt.Printf("  Base Fee:       %d\n", hexToUint64(fb.BaseFeePerGas))
	fmt.Printf("  State Root:     %s\n", truncateHash(fb.StateRoot))
	fmt.Printf("  Receipts Root:  %s\n", truncateHash(fb.ReceiptsRoot))

	fmt.Printf("\n  Transactions: %d\n", len(fb.Transactions))
	for i, tx := range fb.Transactions {
		if i >= 5 {
			fmt.Printf("    ... and %d more\n", len(fb.Transactions)-5)
			break
		}
		fmt.Printf("    [%d] %s from %s\n", i, truncateHash(tx.Hash), truncateHash(tx.From))
	}

	fmt.Println()
}

func truncateHash(hash string) string {
	if len(hash) <= 20 {
		return hash
	}
	return hash[:10] + "..." + hash[len(hash)-8:]
}

// loadDotEnv loads KEY=VALUE pairs from a .env file into the process
// environment. It is a no-op if the file is absent, and never overrides a
// variable that is already set in the environment.
func loadDotEnv(path string) {
	f, err := os.Open(path)
	if err != nil {
		return // .env is optional
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		key, val, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		key = strings.TrimSpace(key)
		val = strings.Trim(strings.TrimSpace(val), `"'`)
		if _, exists := os.LookupEnv(key); !exists {
			os.Setenv(key, val)
		}
	}
	if err := scanner.Err(); err != nil {
		log.Printf("Warning: error reading %s: %v", path, err)
	}
}
