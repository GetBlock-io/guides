import { createStream } from './stream.js';
import { watchWhales } from './whales.js';
import { watchPressure } from './pressure.js';

const SOL = 'So11111111111111111111111111111111111111112';
const USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const MIN_USDC = Number(process.env.MIN_USDC ?? 10000);

const num = (value, digits = 2) =>
  Number(value).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const short = (address) => `${address.slice(0, 4)}…${address.slice(-4)}`;

function describePressure(row) {
  const ratio = Number(row?.buy_sell_ratio);
  if (!Number.isFinite(ratio)) return 'n/a';
  const side = ratio >= 1 ? 'buy-heavy' : 'sell-heavy';
  return `${ratio.toFixed(2)} ${side} over ${row.total_swaps} swaps`;
}

const stream = createStream();
const pressure = watchPressure(stream, { base: SOL, quote: USDC, window: '5m' });

watchWhales(stream, { base: SOL, quote: USDC, minQuote: MIN_USDC }, (trade) => {
  const side = trade.is_buy ? 'BUY ' : 'SELL';
  console.log(
    `🐋 ${side} ${num(trade.base_volume)} SOL ($${num(trade.quote_volume, 0)}) ` +
    `@ ${num(trade.price)}  |  5m pressure ${describePressure(pressure())}`
  );
  console.log(
    `   ${trade.timestamp.slice(11, 19)} UTC  signer ${short(trade.signer)}  ` +
    `https://solscan.io/tx/${trade.signature}`
  );
});

stream.connect();
console.log(`Watching SOL/USDC for trades of ${num(MIN_USDC, 0)} USDC or more…`);
