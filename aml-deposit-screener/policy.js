// policy.js

/** Map a 0–100 score onto the documented Crypto AML risk bands. */
export function riskBand(score) {
  if (score >= 75) return "very-high";
  if (score >= 50) return "high";
  if (score >= 25) return "medium";
  return "low";
}

// Categories that should never be auto-accepted, wherever they appear.
const CRITICAL = new Set([
  "sanctionsExposure",
  "terrorismFinancing",
  "weaponsProliferationFinancing",
  "childAbuse",
  "humanExploitation",
  "stolenAssets",
  "hacking",
  "extortionActivity",
  "darknetActivity",
]);

/**
 * Turn a wallet or transaction report into ACCEPT / REVIEW / REJECT.
 * Tune the thresholds to your own compliance policy.
 */
export function decide(report) {
  const score = report.overallRiskScore ?? report.riskScore ?? 0;
  const band = riskBand(score);
  const reject = [];
  const review = [];

  if (band === "very-high") reject.push(`risk score ${score} (very-high band)`);
  if (band === "high") review.push(`risk score ${score} (high band)`);

  // Wallet report: direct FATF-style flags on counterparties.
  for (const flag of report.breakdown?.fatf?.flags ?? []) {
    const label = `${flag.flow}bound ${flag.category} x${flag.count}`;
    (CRITICAL.has(flag.category) ? reject : review).push(label);
  }

  // Wallet report: issuer restrictions on a token (e.g. frozen USDT).
  for (const r of report.attribution?.assetRestrictions ?? []) {
    review.push(`asset restriction on ${r.asset}`);
  }

  // Wallet report: the address sits inside a risky cluster (high band or above).
  const cluster = report.attribution?.cluster;
  if (cluster?.score >= 50) {
    review.push(`member of high-risk cluster ${cluster.names?.join(", ") ?? ""} (score ${cluster.score})`.trim());
  }

  // Transaction report: no counterparties means the asset transfer wasn't found, so nothing was screened.
  const cp = report.counterparties;
  if (cp && !Object.keys(cp.in ?? {}).length && !Object.keys(cp.out ?? {}).length) {
    review.push("no counterparties returned — check the tx hash and asset");
  }

  // Transaction report: any counterparty scoring in the very-high band.
  for (const flow of ["in", "out"]) {
    for (const [addr, s] of Object.entries(report.counterparties?.[flow] ?? {})) {
      if (s >= 75) review.push(`${flow} counterparty ${addr} scores ${s}`);
    }
  }

  // Both reports: critical categories in the exposure composition.
  const exposure = report.breakdown?.exposure ?? report;
  for (const e of [...(exposure.activityExposure ?? []), ...(exposure.complianceExposure ?? [])]) {
    if (CRITICAL.has(e.category) && e.share > 0) review.push(`${e.category} exposure ${e.share}%`);
  }

  const decision = reject.length ? "REJECT" : review.length ? "REVIEW" : "ACCEPT";
  return { decision, score, band, reasons: [...reject, ...review] };
}
