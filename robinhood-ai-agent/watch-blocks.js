// Step 2 — stream new blocks over GetBlock's WebSocket endpoint.
// Robinhood Chain produces blocks roughly every 100ms when there is activity.
// Run: npm run watch   (Ctrl+C to stop)
import { createWsClient } from "./chain.js";

const wsClient = createWsClient();
let lastTimestamp = null;

console.log("👀 Watching Robinhood Chain blocks (Ctrl+C to stop)...\n");

const unwatch = wsClient.watchBlocks({
  onBlock(block) {
    const delta =
      lastTimestamp !== null ? `+${Number(block.timestamp - lastTimestamp)}s` : "—";
    lastTimestamp = block.timestamp;
    // newHeads subscriptions deliver headers only — tx list may be absent
    const txs = block.transactions ? String(block.transactions.length).padStart(3) : "  ?";
    console.log(`#${block.number}  txs: ${txs}  gasUsed: ${block.gasUsed}  Δ ${delta}`);
  },
  onError(error) {
    console.error("Watch error:", error.message);
  },
});

process.on("SIGINT", () => {
  unwatch();
  process.exit(0);
});
