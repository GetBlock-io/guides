import "dotenv/config";
import { createPublicClient, defineChain, http, webSocket } from "viem";

const RPC_URL = process.env.GETBLOCK_RPC_URL;
const WS_URL = process.env.GETBLOCK_WS_URL;

if (!RPC_URL) {
  throw new Error(
    "GETBLOCK_RPC_URL is not set. Copy .env.example to .env and paste your GetBlock Robinhood Chain endpoint."
  );
}

// Robinhood Chain mainnet — an Arbitrum-based Ethereum L2 with ~100ms blocks.
// Chain ID 4663 (testnet: 46630). Gas is paid in ETH.
export const robinhoodChain = defineChain({
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [RPC_URL],
      ...(WS_URL ? { webSocket: [WS_URL] } : {}),
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://robinhoodchain.blockscout.com",
    },
  },
});

export const publicClient = createPublicClient({
  chain: robinhoodChain,
  transport: http(RPC_URL),
});

export function createWsClient() {
  if (!WS_URL) {
    throw new Error("GETBLOCK_WS_URL is not set — WebSocket subscriptions need it.");
  }
  return createPublicClient({
    chain: robinhoodChain,
    transport: webSocket(WS_URL),
  });
}
