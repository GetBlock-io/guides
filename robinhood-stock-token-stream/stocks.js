import { createStream } from "./stream.js";

const STREAM_URL =
  "wss://stream.eu-central-1.getblock.io/v1/robinhood-mainnet/stream";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const MAX_SUBSCRIPTIONS = 15;

/**
 * Streams live Stock Token movements on Robinhood Chain and calls `onAlert`
 * for every mint, burn, or transfer of at least `minShares` shares.
 */
export function watchStockTokens(
  watchlist,
  { apiKey, minShares = "0", onAlert, onStatus, url = STREAM_URL },
) {
  if (!apiKey)
    throw new Error(
      "GETBLOCK_API_KEY is not set. Copy .env.example to .env and add your key.",
    );
  if (watchlist.length > MAX_SUBSCRIPTIONS) {
    throw new Error(
      `Watchlist has ${watchlist.length} tokens; the limit is ${MAX_SUBSCRIPTIONS} subscriptions per account.`,
    );
  }

  const byAddress = new Map(
    watchlist.map((t) => [
      t.address.toLowerCase(),
      { ...t, minRaw: parseUnits(minShares, t.decimals) },
    ]),
  );

  // One erc20Transfers subscription per token: tokenContract takes a single address
  const subscriptions = watchlist.map((t) => ({
    label: t.symbol,
    topic: "erc20Transfers",
    filters: { tokenContract: t.address },
  }));

  return createStream({
    url,
    apiKey,
    subscriptions,
    onStatus,
    onEvent(event) {
      const { data, removed } = event;
      const token = byAddress.get(data.tokenContract.toLowerCase());
      if (!token) return;

      const raw = BigInt(data.value);
      if (raw < token.minRaw) return;

      onAlert({
        type: removed ? "REVERTED" : classify(data),
        symbol: token.symbol,
        shares: formatUnits(raw, token.decimals),
        from: data.from,
        to: data.to,
        block: Number(BigInt(data.blockNumber)),
        time: new Date(
          Number(BigInt(data.blockTimestamp)) * 1000,
        ).toISOString(),
        txHash: data.transactionHash,
        explorer: `https://robinhoodchain.blockscout.com/tx/${data.transactionHash}`,
        eventId: event.eventId,
      });
    },
  });
}

// Stock Tokens are minted from and burned to the zero address
export function classify({ from, to }) {
  if (from.toLowerCase() === ZERO_ADDRESS) return "MINT";
  if (to.toLowerCase() === ZERO_ADDRESS) return "BURN";
  return "TRANSFER";
}

// BigInt-safe conversions: 18-decimal values overflow JavaScript numbers
export function formatUnits(raw, decimals) {
  const base = 10n ** BigInt(decimals);
  const whole = raw / base;
  const fraction = (raw % base)
    .toString()
    .padStart(decimals, "0")
    .replace(/0+$/, "");
  return fraction ? `${whole}.${fraction}` : `${whole}`;
}

export function parseUnits(value, decimals) {
  const [whole, fraction = ""] = String(value).trim().split(".");
  if (!/^\d+$/.test(whole) || !/^\d*$/.test(fraction))
    throw new Error(`Invalid amount: "${value}"`);
  return BigInt(whole + fraction.slice(0, decimals).padEnd(decimals, "0"));
}
