# Liquity Pool Monitor

This monitor gets on-chain swap events for  Solana liquidity pool and returns human-friendly swap details to the console.

What it does
- Connects to a streaming RPC (Yellowstone gRPC client) and subscribes to `pool_swaps` for a configured pool address.
- Identifies the swap source (Jupiter, Raydium AMM/CLMM) by inspecting program IDs in transaction instructions.
- Prints swap summary (source, trader, signature, slot, timestamp) and links to Solscan.

### Key files
- `pool-monitor.js` — main monitor script
- `.env` / `.env.example` — environment variables
- `package.json` — project manifest (start script: `node pool-monitor.js`)

Prerequisites
- Node.js 18+ (LTS recommended)
- A working `GETBLOCK_TOKEN` (or compatible streaming RPC credentials) as configured in `.env`

### Environment
Create a `.env` file with:

```
GETBLOCK_TOKEN=<YOUR_GETBLOCK_TOKEN>
```

### Configuration
- The script contains constants for the monitored pool (`TARGET_POOL`) and known program ids (Raydium/Jupiter). Update `pool-monitor.js` if you want to monitor a different pool or add additional program detectors.

### Run

```bash
npm install
node pool-monitor.js
```

### Troubleshooting
- Stream / auth errors: confirm `GETBLOCK_TOKEN` is valid and that the endpoint you use supports streaming subscriptions.
- Missing swap prints: verify the `TARGET_POOL` address is correct and that swaps occur on the observed pool. Try lowering filtering or temporarily log raw messages for debugging.
- Dependency issues: ensure `@triton-one/yellowstone-grpc` and `bs58` are installed; use the versions in `package.json`.

Behavior on failure
- The monitor restarts itself after 5 seconds if an unhandled error occurs (see `main()` retry logic).
