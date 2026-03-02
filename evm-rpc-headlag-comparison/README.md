# EVM RPC Headlag Comparison

A CLI tool that compares block propagation latency across multiple EVM RPC endpoints in real time. It subscribes to `newHeads` via WebSocket on each node and measures which provider delivers new block headers first.

## Metrics

- **First count** — how often a node delivers a block header before all others
- **Average delay** — mean lag (ms) relative to the fastest node per block
- **Percentiles** — P50 / P75 / P90 / P95 / P99 delay breakdown

Stats are printed to stdout every 5 seconds.

## Usage

```bash
go run main.go -nodes "node1=wss://url1,node2=wss://url2"
```

At least two nodes are required.

### Example

```bash
go run main.go -nodes "getblock=wss://eth.getblock.io/YOUR_KEY,chainstack=wss://bsc-mainnet.core.chainstack.com/YOUR_KEY,alchemy=wss://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"
```

## Requirements

- Go 1.21+
