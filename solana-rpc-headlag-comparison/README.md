# Solana RPC Headlag Comparison

A CLI tool that compares slot propagation latency across multiple Solana RPC endpoints in real time. It subscribes to `slotSubscribe` via WebSocket on each node and measures which provider delivers new slot notifications first.

## Metrics

- **First count** — how often a node delivers a slot notification before all others
- **Average delay** — mean lag (ms) relative to the fastest node per slot
- **Percentiles** — P50 / P75 / P90 / P95 / P99 delay breakdown

Stats are printed to stdout every 5 seconds.

## Usage

```bash
go run main.go -nodes "node1=wss://url1,node2=wss://url2"
```

At least two nodes are required.

### Example

```bash
go run main.go -nodes "getblock=wss://go.getblock.io/YOUR_KEY,helius=wss://mainnet.helius-rpc.com/?api-key=YOUR_KEY"
```

## Requirements

- Go 1.21+
