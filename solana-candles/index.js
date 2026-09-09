import { createCandleStream, SOL, USDC } from './candles.js';
import { startServer } from './server.js';

const broadcast = startServer(8080);

createCandleStream(
  { base: SOL, quote: USDC, window: '1m', hydrate: 60 },
  (series) => {
    broadcast(series);
    const last = series[series.length - 1];
    if (last) {
      console.log(
        `${new Date(last.time * 1000).toISOString().slice(11, 19)}  ` +
        `O ${last.open.toFixed(2)}  H ${last.high.toFixed(2)}  ` +
        `L ${last.low.toFixed(2)}  C ${last.close.toFixed(2)}  ` +
        `(${series.length} candles)`
      );
    }
  }
);
