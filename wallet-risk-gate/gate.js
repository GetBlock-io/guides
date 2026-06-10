// gate.js
import { checkWallet } from "./screen.js";

/** Map probabilityFraud (string 0–1) onto a categorical level. */
export function riskLevel(probabilityFraud) {
  const p = Number.parseFloat(probabilityFraud);
  if (!Number.isFinite(p)) return "LOW";
  if (p >= 0.7) return "HIGH";   // tune these thresholds to your risk appetite
  if (p >= 0.3) return "MEDIUM";
  return "LOW";
}

/** Decide whether a wallet may transact. Fails CLOSED on any error. */
export async function shouldAllow(address, network = "eth") {
  try {
    const r = await checkWallet(address, network);

    const level = riskLevel(r.probabilityFraud);
    const sanctioned = r.sanctionData?.some((s) => s.isSanctioned) ?? false;
    const flags = Object.entries(r.forensic_details)
      .filter(([key, v]) => v === "1" && key !== "data_source")
      .map(([key]) => key);

    console.log(`Status:     ${r.status}`);
    console.log(`Fraud prob: ${r.probabilityFraud} (${level})`);
    console.log(`Sanctioned: ${sanctioned ? "YES" : "no"}`);
    console.log(`Flags:      ${flags.join(", ") || "none"}`);

    const block = sanctioned || level === "HIGH" || r.status === "Fraud";
    return { allow: !block, level, sanctioned, flags };
  } catch (err) {
    console.error("Screening failed:", err.message);
    // If we can't verify the wallet, we don't let it through.
    return { allow: false, level: "ERROR", sanctioned: false, flags: [] };
  }
}