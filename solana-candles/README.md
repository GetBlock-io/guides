# Solana Candlestick Chart

A live SOL/USDC candlestick chart built on GetBlock Solana Market Data. It backfills the last 60 one-minute candles on startup, then updates in real time as trades land on Solana DEXes.

Companion project for the guide [How to Build a Live Solana Candlestick Chart with GetBlock Solana Market Data](https://docs.getblock.io/guides/how-to-build-a-live-solana-candlestick-chart-with-getblock-market-data).

What it does

- Opens a WebSocket to the Solana Market Data stream and subscribes to the `ohlcv` topic for a token pair.
- Seeds the chart from the `hydrate` backfill, so it is populated the moment it opens.
- Reconciles the `inserts`, `updates` and `deletes` change sets into a `Map` keyed by each candle's stable `id`, so the candle still being built is revised in place instead of duplicated.
- Relays the sorted series to a browser over a local WebSocket and redraws with TradingView Lightweight Charts.

### Key files

- `candles.js` — subscribes to the stream and reconciles change sets into a sorted series
- `server.js` — serves the page and relays each new series to connected browsers
- `public/index.html` — the chart
- `index.js` — entry point (start script: `node index.js`)
- `.env` / `.env.example` — environment variables

Prerequisites

- Node.js 20+ (uses the built-in global `WebSocket`, so no client library is needed)
- A GetBlock API key with **Solana Market Data** activated — [get one here](https://account.getblock.io/products/solana-data-stream#api-keys)

### Environment
Create a `.env` file with:

```bash
GETBLOCK_API_KEY=<YOUR_API_KEY>
```

The key is passed as an `apiKey` query parameter rather than an `Authorization` header. It stays server-side — the browser only ever receives candle data.

### Run

```bash
npm install
node index.js
```

Then open http://localhost:8080.

The terminal prints the candle currently being built:

```bash
Chart on http://localhost:8080
Subscribed to 1m candles: 0x413ff763f0614355435e11aa3eb6a366
12:26:00  O 104.33  H 104.33  L 104.32  C 104.32  (60 candles)
12:26:00  O 104.33  H 104.46  L 104.32  C 104.32  (60 candles)
12:26:00  O 104.33  H 104.48  L 104.13  C 104.34  (60 candles)
```

The timestamp stays put and the high climbs — that is one candle being revised, not three candles. The count stays at 60 because `hydrate` sets the size of the retained set, not just the backfill.

### Configuration

`index.js` holds the subscription options. Change the pair, candle period, or history depth there:

- `base` / `quote` — mint addresses for the pair. **Set both**: omitting them subscribes you to every market on Solana, not to a default pair.
- `window` — candle period. One of `1s`, `10s`, `30s`, `1m`, `5m`, `30m`, `1h`, `2h`, `4h`, `6h`, `8h`, `12h`, `24h`.
- `hydrate` — how many candles to keep, `1`–`100`.

### Troubleshooting

- Socket closes instantly with code `1006` and no reason: the key was rejected during the WebSocket handshake and browsers cannot surface the underlying `401`. Confirm `GETBLOCK_API_KEY` is set and that Solana Market Data is activated on that key.
- Duplicate candles marching sideways: something is appending messages instead of upserting by `row.id`. The open candle is re-sent under the same `id` as more trades land.
- `Cannot read properties of undefined (reading 'result')`: the subscription acknowledgement is being treated as a candle. It is the one message with a top-level string `result`; `candles.js` returns early on it.
- Blank chart or a `setData` error: the series must be sorted ascending by `time` with one row per timestamp.
- Candle count never grows past `hydrate`: expected. Raise `hydrate` (max `100`) or keep evicted candles in your own store.

Behavior on failure

- The stream reconnects automatically 3 seconds after a close (see `ws.onclose` in `candles.js`).
