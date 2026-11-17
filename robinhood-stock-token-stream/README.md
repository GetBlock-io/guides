# Robinhood Chain Stock Token Stream

A live feed of tokenized stock mints, burns, and transfers on Robinhood Chain, built on [GetBlock EVM Data Stream](https://docs.getblock.io/evm-data-stream/overview).

The app opens one WebSocket connection to the `robinhood-mainnet` stream, subscribes to the `erc20Transfers` topic once per Stock Token in your watchlist, and prints each movement as soon as its block is produced.

Full walkthrough: [Stream Robinhood Chain Stock Token activity](https://docs.getblock.io/evm-data-stream/stream-robinhood-chain-stock-token-activity)

## Run it

```bash
npm install
cp .env.example .env   # then paste your gb_… API key
npm start
```

## Files

| File | What it does |
| --- | --- |
| `tokens.js` | The watchlist: Stock Token symbol, mainnet contract, and decimals. |
| `stream.js` | WebSocket client: auth, subscribe, route by subscription, dedupe by `eventId` + `revision`, reconnect with backoff. |
| `stocks.js` | `watchStockTokens()`: one subscription per token, mint/burn/transfer classification, BigInt amount formatting, size threshold. |
| `index.js` | Entry point that prints alerts with Blockscout links. |

## Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `GETBLOCK_API_KEY` | Yes | GetBlock API key from **Settings → API Keys**. Starts with `gb_`. |
| `MIN_SHARES` | No | Skip movements smaller than this many shares. Default `0`. |

## Cost

Each delivered event costs 10 CU. Each subscribe also costs 10 CU, so starting the default 8-token watchlist costs 80 CU. That 80 CU is charged again every time the client reconnects.
