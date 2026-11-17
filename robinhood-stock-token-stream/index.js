import "dotenv/config";
import { STOCK_TOKENS } from "./tokens.js";
import { watchStockTokens } from "./stocks.js";

const ICONS = { MINT: "🟢", BURN: "🔴", TRANSFER: "🔁", REVERTED: "⚠️ " };
const short = (addr) => `${addr.slice(0, 6)}…${addr.slice(-4)}`;
const minShares = process.env.MIN_SHARES || "0";

console.log(
  `📈 Watching ${STOCK_TOKENS.map((t) => t.symbol).join(", ")} on Robinhood Chain`,
);
console.log(`   Minimum size: ${minShares} shares (Ctrl+C to stop)\n`);

const stream = watchStockTokens(STOCK_TOKENS, {
  apiKey: process.env.GETBLOCK_API_KEY,
  minShares,
  onStatus: (line) => console.log(`[stream] ${line}`),
  onAlert(alert) {
    const route =
      alert.type === "MINT"
        ? `→ ${short(alert.to)}`
        : alert.type === "BURN"
          ? `← ${short(alert.from)}`
          : `${short(alert.from)} → ${short(alert.to)}`;
    console.log(
      `${ICONS[alert.type]} ${alert.type.padEnd(8)} ${alert.shares.padStart(14)} ${alert.symbol.padEnd(5)} ${route}  block ${alert.block}  ${alert.time}`,
    );
    console.log(`   ${alert.explorer}`);
  },
});

process.on("SIGINT", () => {
  stream.close();
  process.exit(0);
});
