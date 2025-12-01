package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/andybalholm/brotli"
	"github.com/gorilla/websocket"
)

const (
	mainnetWSURL = "wss://mainnet.flashblocks.base.org/ws"
	sepoliaWSURL = "wss://sepolia.flashblocks.base.org/ws"
)

// Flashblock represents the root structure of a flashblock message
type Flashblock struct {
	Diff     BlockDiff `json:"diff"`
	Index    int       `json:"index"`
	Metadata Metadata  `json:"metadata"`
}

// BlockDiff contains the block differences/updates
type BlockDiff struct {
	BlobGasUsed     string   `json:"blob_gas_used"`
	BlockHash       string   `json:"block_hash"`
	GasUsed         string   `json:"gas_used"`
	LogsBloom       string   `json:"logs_bloom"`
	ReceiptsRoot    string   `json:"receipts_root"`
	StateRoot       string   `json:"state_root"`
	Transactions    []string `json:"transactions"`
	Withdrawals     []any    `json:"withdrawals"`
	WithdrawalsRoot string   `json:"withdrawals_root"`
}

// Metadata contains block metadata including balances and receipts
type Metadata struct {
	BlockNumber        uint64             `json:"block_number"`
	NewAccountBalances map[string]string  `json:"new_account_balances"`
	Receipts           map[string]Receipt `json:"receipts"`
}

// Receipt represents a transaction receipt (can be EIP-1559 or Legacy)
type Receipt struct {
	Eip1559 *ReceiptData `json:"Eip1559,omitempty"`
	Legacy  *ReceiptData `json:"Legacy,omitempty"`
}

// GetData returns the receipt data regardless of type
func (r *Receipt) GetData() *ReceiptData {
	if r.Eip1559 != nil {
		return r.Eip1559
	}
	return r.Legacy
}

// GetType returns the receipt type as a string
func (r *Receipt) GetType() string {
	if r.Eip1559 != nil {
		return "EIP-1559"
	}
	if r.Legacy != nil {
		return "Legacy"
	}
	return "Unknown"
}

// ReceiptData contains the actual receipt information
type ReceiptData struct {
	CumulativeGasUsed string `json:"cumulativeGasUsed"`
	Logs              []Log  `json:"logs"`
	Status            string `json:"status"`
}

// Log represents an event log
type Log struct {
	Address string   `json:"address"`
	Data    string   `json:"data"`
	Topics  []string `json:"topics"`
}

func main() {
	network := flag.String("network", "mainnet", "Network to connect to: mainnet or sepolia")
	flag.Parse()

	var wsURL string
	switch *network {
	case "mainnet":
		wsURL = mainnetWSURL
	case "sepolia":
		wsURL = sepoliaWSURL
	default:
		log.Fatalf("Invalid network: %s. Use 'mainnet' or 'sepolia'", *network)
	}

	log.Printf("Connecting to Base flashblocks on %s: %s", *network, wsURL)

	conn, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
	if err != nil {
		log.Fatalf("Failed to connect to WebSocket: %v", err)
	}
	defer conn.Close()

	log.Println("Connected! Listening for flashblocks...")

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
	var flashblock Flashblock
	if err := json.Unmarshal(data, &flashblock); err != nil {
		log.Printf("Error parsing flashblock JSON: %v", err)
		log.Printf("Raw data: %s", string(data))
		return
	}

	printFlashblock(&flashblock)
}

func printFlashblock(fb *Flashblock) {
	fmt.Println("═══════════════════════════════════════════════════════════════")
	fmt.Printf("FLASHBLOCK #%d | Block: %d | Hash: %s\n",
		fb.Index,
		fb.Metadata.BlockNumber,
		truncateHash(fb.Diff.BlockHash))
	fmt.Println("═══════════════════════════════════════════════════════════════")

	fmt.Printf("  Gas Used:       %s\n", fb.Diff.GasUsed)
	fmt.Printf("  Blob Gas Used:  %s\n", fb.Diff.BlobGasUsed)
	fmt.Printf("  State Root:     %s\n", truncateHash(fb.Diff.StateRoot))
	fmt.Printf("  Receipts Root:  %s\n", truncateHash(fb.Diff.ReceiptsRoot))

	fmt.Printf("\n  Transactions: %d\n", len(fb.Diff.Transactions))
	for i, tx := range fb.Diff.Transactions {
		fmt.Printf("    [%d] %s...\n", i, truncateHash(tx))
	}

	fmt.Printf("\n  Account Balance Updates: %d\n", len(fb.Metadata.NewAccountBalances))

	fmt.Printf("\n  Receipts: %d\n", len(fb.Metadata.Receipts))
	receiptCount := 0
	for txHash, receipt := range fb.Metadata.Receipts {
		if receiptCount >= 3 {
			fmt.Printf("    ... and %d more receipts\n", len(fb.Metadata.Receipts)-3)
			break
		}
		data := receipt.GetData()
		if data != nil {
			fmt.Printf("    [%s] %s - Status: %s, Logs: %d\n",
				receipt.GetType(),
				truncateHash(txHash),
				data.Status,
				len(data.Logs))
		}
		receiptCount++
	}

	fmt.Println()
}

func truncateHash(hash string) string {
	if len(hash) <= 20 {
		return hash
	}
	return hash[:10] + "..." + hash[len(hash)-8:]
}
