import { checkRugPull } from "./rugpull.js";
import { collectRedFlags } from "./flags.js";

function riskLevel(probabilityFraud) {
  const p = Number.parseFloat(probabilityFraud);
  if (!Number.isFinite(p)) return "LOW";
  if (p >= 0.7) return "HIGH";
  if (p >= 0.3) return "MEDIUM";
  return "LOW";
}

export async function vetToken(contractAddress, network = "eth") {
  try {
    const r = await checkRugPull(contractAddress, network);
    const ind = r.risk_indicators;

    console.log(`Token:    ${ind.token_name} (${ind.token_symbol})`);
    console.log(`Contract: ${r.contractAddress} [${r.chain}]`);

    console.log("\n── Risk model ────────────────────────────");
    console.log(`Verdict:     ${r.status}`);
    console.log(`Risk status: ${r.risk_status} (score ${r.risk_score})`);
    console.log(
      `AI rug prob: ${r.probabilityFraud} (${riskLevel(r.probabilityFraud)})`,
    );

    console.log("\n── Market ────────────────────────────────");
    console.log(`Holders:   ${ind.holder_count}`);
    console.log(`Liquidity: $${Number(ind.liquidity).toLocaleString()}`);
    console.log(`Market cap: $${Number(ind.market_cap).toLocaleString()}`);

    const redFlags = collectRedFlags(r);
    console.log("\n── Red flags ─────────────────────────────");
    if (redFlags.length) for (const f of redFlags) console.log(`  ✗ ${f}`);
    else console.log("  none detected");

    const block =
      r.status === "Fraud" ||
      riskLevel(r.probabilityFraud) === "HIGH" ||
      redFlags.length > 0;

    console.log(`\n→ ${block ? "NO-GO — do not list" : "GO — safe to list"}`);
    return { go: !block, redFlags };
  } catch (err) {
    console.error("Vetting failed:", err.message);
    // Fail closed: if we can't vet it, we don't list it.
    return { go: false, redFlags: ["vetting failed"] };
  }
}
