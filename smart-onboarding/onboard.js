import { auditWallet } from "./audit.js";

function riskLevel(probabilityFraud) {
  const p = Number.parseFloat(probabilityFraud);
  if (!Number.isFinite(p)) return "LOW";
  if (p >= 0.7) return "HIGH";
  if (p >= 0.3) return "MEDIUM";
  return "LOW";
}

export async function onboardWallet(address, network = "eth") {
  try {
    const a = await auditWallet(address, network);

    // 1. AML / fraud gate — runs before any personalization.
    const level = riskLevel(a.probabilityFraud);
    const sanctioned = a.sanctionData?.some((s) => s.isSanctioned) ?? false;
    const flags = Object.entries(a.forensic_details)
      .filter(([key, v]) => v === "1" && key !== "data_source")
      .map(([key]) => key);

    console.log("── AML screening ─────────────────────────");
    console.log(`Status:     ${a.status}`);
    console.log(`Fraud prob: ${a.probabilityFraud} (${level})`);
    console.log(`Sanctioned: ${sanctioned ? "YES" : "no"}`);
    console.log(`Flags:      ${flags.join(", ") || "none"}`);

    if (sanctioned || level === "HIGH" || a.status === "Fraud") {
      return {
        allow: false,
        reason: sanctioned
          ? "wallet appears on a sanctions list"
          : `fraud risk is ${level}`,
      };
    }

    // 2. Behavioral profile — drives the personalized flow.
    const {
      wallet_age_days,
      total_balance_usd,
      transaction_count,
      wallet_rank,
    } = a.userDetails;
    console.log("\n── Behavioral profile ────────────────────");
    console.log(`Wallet age:    ${wallet_age_days} days`);
    console.log(`Balance:       $${total_balance_usd.toLocaleString()}`);
    console.log(`Tx count:      ${transaction_count}`);
    console.log(`Wallet rank:   ${wallet_rank}`);
    console.log(`Experience:    ${a.experience.Value}/10`);
    console.log(`Risk capacity: ${a.riskCapability}/10`);

    // 3. Predicted intentions — what is this wallet likely to do?
    console.log("\n── Predicted intentions ──────────────────");
    for (const [activity, likelihood] of Object.entries(a.intention.Value)) {
      console.log(`  ${activity.padEnd(16)} ${likelihood}`);
    }

    // 4. Protocols already used — power an "import your positions" step.
    if (a.protocols?.length) {
      const top = [...a.protocols]
        .sort((x, y) => y.Count - x.Count)
        .slice(0, 5)
        .map((p) => `${p.Protocol} (${p.Count})`);
      console.log(`\nTop protocols: ${top.join(", ")}`);
    }

    // 5. Model recommendations — feed your UI directly.
    if (a.recommendation?.Value?.length) {
      console.log("\n── Recommended for this user ─────────────");
      for (const rec of a.recommendation.Value) console.log(`  • ${rec}`);
    }

    return {
      allow: true,
      reason: "passed AML screening",
      experience: a.experience.Value,
    };
  } catch (err) {
    console.error("Audit failed:", err.message);
    //Fail-closed Fail closed: if we can't audit, we don't onboard.
    return { allow: false, reason: "audit failed — could not verify wallet" };
  }
}
