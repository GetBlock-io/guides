// screener.js
import { appendFile } from "node:fs/promises";
import { checkWallet, checkTransaction, NETWORKS } from "./aml.js";
import { decide } from "./policy.js";

const AUDIT_LOG = "aml-audit.jsonl";

/**
 * Screen an incoming deposit before crediting it.
 * Pass `{ address, network }` for a wallet or `{ tx, network, asset }` for a transaction.
 * Fails CLOSED: if the check errors, the deposit is held for REVIEW.
 */
export async function screenDeposit(input) {
  const network = input.network?.toLowerCase();
  const kind = input.tx ? "transaction" : "wallet";
  let result;

  try {
    if (!NETWORKS.includes(network)) {
      throw new Error(`Unsupported network "${input.network}". Use one of: ${NETWORKS.join(", ")}`);
    }

    const report = input.tx
      ? await checkTransaction(input.tx, network, input.asset)
      : await checkWallet(input.address, network);

    result = { ...decide(report), reportId: report.reportId ?? null };
  } catch (err) {
    result = { decision: "REVIEW", score: null, band: "unknown", reasons: [`screening failed: ${err.message}`], reportId: null };
  }

  // The tx report does not echo the request, so store it with the decision.
  const record = { checkedAt: new Date().toISOString(), kind, request: input, ...result };
  await appendFile(AUDIT_LOG, JSON.stringify(record) + "\n");

  return record;
}
