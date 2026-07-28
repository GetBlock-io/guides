// Step 1 — verify your GetBlock endpoint is talking to Robinhood Chain.
// Run: npm run quickstart
import { formatGwei } from "viem";
import { publicClient } from "./chain.js";

const [chainId, blockNumber, gasPrice, block] = await Promise.all([
  publicClient.getChainId(),
  publicClient.getBlockNumber(),
  publicClient.getGasPrice(),
  publicClient.getBlock(),
]);

console.log("✅ Connected to Robinhood Chain via GetBlock\n");
console.log(`Chain ID:      ${chainId} ${chainId === 4663 ? "(mainnet)" : chainId === 46630 ? "(testnet)" : ""}`);
console.log(`Latest block:  #${blockNumber}`);
console.log(`Gas price:     ${formatGwei(gasPrice)} gwei`);
console.log(`Block time:    ${new Date(Number(block.timestamp) * 1000).toISOString()}`);
console.log(`Transactions:  ${block.transactions.length} in latest block`);
console.log(`Explorer:      https://robinhoodchain.blockscout.com/block/${blockNumber}`);
