import "dotenv/config";

/** Call the Full Wallet Audit endpoint and return the unwrapped result. */
export async function auditWallet(address, network = "eth") {
  const apiKey = process.env.GETBLOCK_KEY;
  if (!apiKey) throw new Error("Set GETBLOCK_KEY in your environment");

  const res = await fetch(
    "https://services.getblock.io/v1/wallet-audit/audit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, network }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GetBlock audit failed (HTTP ${res.status}): ${text}`);
  }

  const { data } = await res.json(); // unwrap { data: ... }
  return data;
}