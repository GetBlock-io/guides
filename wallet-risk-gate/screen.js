// screen.js
import 'dotenv/config'

/**
 * Call the Wallet Risk Check endpoint and return the unwrapped result.
 * Throws on auth failure (401/403) and other non-OK responses.
 */
export async function checkWallet(address, network = "eth") {
  const apiKey = process.env.GETBLOCK_KEY;
  if (!apiKey) throw new Error("Set GETBLOCK_KEY in your environment");

  const res = await fetch("https://services.getblock.io/v1/wallet-audit/check", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address, network }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GetBlock request failed (HTTP ${res.status}): ${text}`);
  }

  const { data } = await res.json(); // unwrap the { data: ... } envelope
  return data;
}
