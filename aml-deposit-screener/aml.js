// aml.js
import "dotenv/config";

const BASE_URL = "https://services.getblock.io/v1/aml";

export const NETWORKS = ["eth", "trx", "btc", "ltc", "bch"];

/**
 * POST a body to a Crypto AML endpoint and return the unwrapped `data` report.
 * Throws on any non-OK response so the caller can fail closed.
 */
async function amlRequest(path, body) {
  const apiKey = process.env.GETBLOCK_AML_KEY;
  if (!apiKey) throw new Error("Set GETBLOCK_AML_KEY in your .env file");

  const res = await fetch(`${BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.data) {
    throw new Error(`Crypto AML request failed (HTTP ${res.status}): ${json.error ?? "empty report"}`);
  }
  return json.data; // unwrap the { data, error } envelope
}

/** Screen a wallet across every supported asset on the network. */
export function checkWallet(address, network) {
  return amlRequest("wallet-check", { address, network: network.toLowerCase() });
}

/**
 * Screen one asset transfer inside a transaction.
 * On ETH and TRX, always pass `asset` — omitting it screens only the native coin.
 */
export function checkTransaction(tx, network, asset) {
  const body = { tx, network: network.toLowerCase() };
  if (asset) body.asset = asset.toLowerCase();
  return amlRequest("tx-check", body);
}
