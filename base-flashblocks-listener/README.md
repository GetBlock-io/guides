# Base Flashblocks Listener

A Go application that subscribes to Base flashblocks via WebSocket and decodes Brotli-compressed messages in real-time.

## Installation

```bash
go mod tidy
go build -o flashblocks-listener .
```

## Usage

### Connect to Mainnet

```bash
./flashblocks-listener
# or
./flashblocks-listener -network mainnet
```

### Connect to Sepolia Testnet

```bash
./flashblocks-listener -network sepolia
```

## WebSocket Endpoints

| Network | URL |
|---------|-----|
| Mainnet | `wss://mainnet.flashblocks.base.org/ws` |
| Sepolia | `wss://sepolia.flashblocks.base.org/ws` |
