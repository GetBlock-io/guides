// index.js
import { screenDeposit } from "./screener.js";

// Usage:
//   node index.js wallet <address> <network>
//   node index.js tx <txHash> <network> [asset]
const [mode, target, network, asset] = process.argv.slice(2);

if (!["wallet", "tx"].includes(mode) || !target || !network) {
  console.log("Usage: node index.js wallet <address> <network>");
  console.log("       node index.js tx <txHash> <network> [asset]");
  process.exit(1);
}

const input = mode === "tx" ? { tx: target, network, asset } : { address: target, network };
const r = await screenDeposit(input);

console.log(`Target:    ${target} (${network}${asset ? `/${asset}` : ""})`);
console.log(`Score:     ${r.score ?? "n/a"} (${r.band})`);
console.log(`Reasons:   ${r.reasons.length ? "\n  - " + r.reasons.join("\n  - ") : "none"}`);
console.log(`Report ID: ${r.reportId ?? "n/a"}`);
console.log(`Decision:  ${r.decision}`);

// Non-zero exit lets CI jobs or queues act on anything that isn't a clean ACCEPT.
process.exit(r.decision === "ACCEPT" ? 0 : 2);
