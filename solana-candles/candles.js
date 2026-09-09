import 'dotenv/config';

const STREAM_URL =
  `wss://stream.eu-central-1.getblock.io/v1/solana-mainnet/stream?apiKey=${process.env.GETBLOCK_API_KEY}`;

export const SOL = 'So11111111111111111111111111111111111111112';
export const USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

// The chart wants seconds and numbers; the API sends ISO timestamps and
// strings (strings preserve precision, so convert only at the edge).
function toSeries(rows) {
  return [...rows.values()]
    .map((r) => ({
      time: Math.floor(new Date(r.window_start).getTime() / 1000),
      open: Number(r.open),
      high: Number(r.high),
      low: Number(r.low),
      close: Number(r.close),
    }))
    .sort((a, b) => a.time - b.time);
}

export function createCandleStream(options, onSeries) {
  const { base = SOL, quote = USDC, window = '1m', hydrate = 60 } = options;
  const rows = new Map();
  const ws = new WebSocket(STREAM_URL);

  ws.onopen = () => {
    ws.send(JSON.stringify({
      jsonrpc: '2.0',
      id: 'getblock.io',
      method: 'getblock_subscribe',
      params: [{
        source: 'market',
        topic: 'ohlcv',
        params: { base, quote, window, hydrate, throttle: '1s' },
      }],
    }));
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    // The first reply is the subscription ID, not a candle.
    if (typeof msg.result === 'string') {
      console.log(`Subscribed to ${window} candles:`, msg.result);
      return;
    }

    const { inserts = [], updates = [], deletes = [] } = msg.params.result;

    // Upsert by id, then remove deletes by id. `updates` revises the candle
    // that is still open; `deletes` are rows falling out of the hydrate window.
    for (const row of [...inserts, ...updates]) rows.set(row.id, row);
    for (const row of deletes) rows.delete(row.id);

    onSeries(toSeries(rows));
  };

  ws.onclose = (event) => {
    console.error(`Stream closed (code ${event.code}). Retrying in 3s…`);
    setTimeout(() => createCandleStream(options, onSeries), 3000);
  };

  return ws;
}
