import 'dotenv/config'

// Rug Pull uses its own uppercase codes and a different alphabet (BNB, not BSC).
const NETWORK_CODE = {
  eth: "ETH",
  ethereum: "ETH",
  bsc: "BNB",
  bnb: "BNB",
  base: "BASE",
};

/** Call the Rug Pull Check endpoint and return the unwrapped result. */
export async function checkRugPull(contractAddress, network = "eth") {
  const apiKey = process.env.GETBLOCK_KEY;
  if (!apiKey) throw new Error("Set GETBLOCK_KEY in your environment");

  const code = NETWORK_CODE[network.trim().toLowerCase()];
  if (!code)
    throw new Error(`Rug Pull supports eth, bsc, base — got "${network}"`);

  const res = await fetch('https://services.getblock.io/v1/rug-pull/check', {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ network: code, contract_address: contractAddress }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Rug Pull check failed (HTTP ${res.status}): ${text}`);
  }

  const { data } = await res.json(); // unwrap { data: ... }
  return data;
}
