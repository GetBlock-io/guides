# Flashblocks Listener

Go programs that subscribe to **Flashblocks** (~200ms pre-confirmations) over a
GetBlock WebSocket endpoint and print each flashblock in real time.

The listener is split by chain so the endpoints and config never get mixed up:

| Command             | Chain                 | Directory                 |
| ------------------- | --------------------- | ------------------------- |
| `go run ./base`     | Base (chainId 8453)   | [`base/`](./base)         |
| `go run ./optimism` | Optimism (chainId 10) | [`optimism/`](./optimism) |

Both share the same flow: connect → send `eth_subscribe ["newFlashblocks"]` →
read `eth_subscription` notifications (the flashblock lives in `params.result`).

## Setup

Tokens are read from a `.env` file at runtime — they are never hard-coded in
the source. Copy the example and fill in your GetBlock tokens:

```bash
go mod tidy
cp .env.example .env
# then edit .env
```

`.env` is git-ignored, so your tokens stay local. The token is the path segment
of your endpoint (`wss://go.getblock.io/<TOKEN>`) and **must be
flashblocks-enabled** for the right chain.

- `BASE_MAINNET_TOKEN` — used by `go run ./base`
- `BASE_SEPOLIA_TOKEN` — used by `go run ./base -network sepolia`
- `OPTIMISM_MAINNET_TOKEN` — used by `go run ./optimism`
- `OPTIMISM_SEPOLIA_TOKEN` — used by `go run ./optimism -network sepolia`

## Usage

```bash
# Base
go run ./base                     # mainnet (default)
go run ./base -network sepolia    # sepolia

# Optimism
go run ./optimism                 # mainnet (default)
go run ./optimism -network sepolia
```

Or build binaries:

```bash
go build -o base-listener ./base
go build -o optimism-listener ./optimism
```

## Notes

- **The two feeds use different payload shapes**, which is why the code is split:
  - **Optimism** sends the raw flashblocks *diff* format —
    `{payload_id, index, diff, metadata}` (snake_case, `metadata` with receipts
    and account balances).
  - **Base** sends a *full block* snapshot in standard Ethereum JSON
    (camelCase, hex quantities, full transaction objects). `hash`/`stateRoot`
    read as zero while the block is still in progress (shown as `(pending)`).
- The endpoint URL (including the token) is intentionally **not logged**, so
  screenshots and logs won't leak your token.
- If a token is missing, the program exits with a clear message telling you
  which variable to set.
