# Solana Whale Trade Alerts

A bot that flags every SOL/USDC trade above a size you choose, in real time, and adds the market's current five-minute buy/sell pressure to each alert. Built on GetBlock Solana Market Data.

Companion project for the guide [How to Build a Solana Whale Trade Alert Bot with GetBlock Solana Market Data](https://docs.getblock.io/guides/how-to-build-a-solana-whale-trade-alert-bot-with-getblock-market-data).

What it does
- Opens one WebSocket to the Solana Market Data stream and runs two subscriptions on it: `trades` for individual fills and `volume` for windowed buy/sell activity.
- Records the startup backfill without alerting, so only new trades fire.
- Alerts once per trade at or above `MIN_USDC`, de-duplicated by the trade's stable `id`.
- After a disconnect, checks the new backfill against trades already processed, so large trades from a short outage are still reported — without repeats.
- Prints side, size, price, five-minute `buy_sell_ratio` with its swap count, the signer, and a Solscan link.

### Key files
- `stream.js` — one shared WebSocket: subscribes, routes notifications by subscription ID, reconnects with backoff
- `whales.js` — the `trades` subscription and the alert logic
- `pressure.js` — the `volume` subscription, holding the latest five-minute window
- `index.js` — entry point that formats alerts (start script: `node index.js`)
- `.env` / `.env.example` — environment variables

Prerequisites
- Node.js 20+ (uses the built-in global `WebSocket`, so no WebSocket library is needed)
- A GetBlock API key with **Solana Market Data** activated — [get one here](https://account.getblock.io/products/solana-data-stream#api-keys)

### Environment
Create a `.env` file with:

```
GETBLOCK_API_KEY=<YOUR_API_KEY>
MIN_USDC=10000
```

`MIN_USDC` is the smallest trade that alerts, in the quote token — for SOL/USDC, effectively dollars.

### Run

```bash
npm install
npm start
```

Sample output:

```
Watching SOL/USDC for trades of 10,000 USDC or more…
🐋 SELL 172.84 SOL ($17,478) @ 101.12  |  5m pressure 1.14 buy-heavy over 4696 swaps
   15:54:47 UTC  signer En3N…YuzP  https://solscan.io/tx/3UTk1WxnPY1qUTacEs9PC4TLKEr9KdzVWpHkWxxgmvG97RTFiTes4BXAZ3bwjzYcGqyGExYKfMdrEwiYtpvE7BeW
🐋 BUY  214.76 SOL ($21,709) @ 101.08  |  5m pressure 1.08 buy-heavy over 974 swaps
   15:55:54 UTC  signer 2Fas…YgN4  https://solscan.io/tx/5aVpF71Cg7tVmCbHkHjXxFRQ6kJQDvYGhg14DL9p8arK1hq54tauCmMKia54FRB4DCGGuZxAJEgMmKa3yiv7LELq
🐋 BUY  177.14 SOL ($17,906) @ 101.08  |  5m pressure 1.08 buy-heavy over 974 swaps
   15:55:54 UTC  signer 7777…tdsa  https://solscan.io/tx/6cDu23RKAUaBgvyBQwznaaLbvs8MnWyMDFkCTjXMewRcinkfmAoEMAoHSgEwR2KWmeHe2eMsxiQepqCCHDiCwF4
🐋 BUY  176.36 SOL ($17,841) @ 101.16  |  5m pressure 1.08 buy-heavy over 974 swaps
   15:55:54 UTC  signer 7777…tdsa  https://solscan.io/tx/5ZdtfPsf2cwPCQfHgHyai2Um8rwfai2ezYSVhrWS66CMZeitnBXJRnkJ8FYXHWFwx1CcVefTh5nUqMCUfyeXhFfo
```

### Configuration
- `MIN_USDC` in `.env` sets the alert threshold.
- `index.js` sets the pair (`SOL` / `USDC` mint addresses) and the pressure `window`. Always set both mints — omitting them subscribes you to every market on Solana.
- To alert somewhere other than the terminal, replace the `console.log` calls in the `watchWhales` callback in `index.js`. Each trade reaches that callback at most once.

### Troubleshooting
- `Stream closed (code 1006)` repeating with growing delays: the key was rejected during the handshake. Check `GETBLOCK_API_KEY` and that Solana Market Data is activated on it.
- No alerts for a long time: the threshold is above current activity. Lower `MIN_USDC`.
- Large trades missing during busy periods: `hydrate` on the `trades` subscription was lowered. Keep it at `100` — in testing, `hydrate: 10` dropped about 10% of trades and `hydrate: 1` dropped 67%.
- Trades from an outage missing: the backfill only holds the last 100 trades on the pair, roughly 5–7 seconds of SOL/USDC activity. Longer outages lose the older trades.
- Pressure reads `0.00` or another extreme value: the window just rolled over and has few swaps. Check the swap count shown in the alert.

Behavior on failure
- The stream reconnects after 1 second, doubling the delay on each consecutive failure up to 30 seconds, and resets once a connection opens. All subscriptions are replayed on reconnect.
