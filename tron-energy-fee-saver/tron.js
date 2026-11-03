// tron.js — on-chain reads and the USDT transfer, through a GetBlock TRON node
import "dotenv/config";
import { TronWeb } from "tronweb";

export const USDT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // USDT (TRC-20) on TRON mainnet
export const SUN_PER_TRX = 1_000_000;

const rpcUrl = process.env.TRON_RPC_URL;
if (!rpcUrl) throw new Error("Set TRON_RPC_URL in your .env file");

export const tronWeb = new TronWeb({
  fullHost: rpcUrl.replace(/\/$/, ""),
  privateKey: process.env.SENDER_PRIVATE_KEY || undefined,
});

/** Current burn prices set by TRON governance, in SUN per unit. */
export async function getBurnPrices() {
  const params = await tronWeb.trx.getChainParameters();
  const get = (key) => params.find((p) => p.key === key)?.value ?? 0;
  return { energySun: get("getEnergyFee"), bandwidthSun: get("getTransactionFee") };
}

/** An address exists on-chain once it has been activated (received TRX or been created). */
export async function isActivated(address) {
  const account = await tronWeb.trx.getAccount(address);
  return Boolean(account.address);
}

/** Energy and Bandwidth the address can spend right now. */
export async function getResources(address) {
  const r = await tronWeb.trx.getAccountResources(address);
  return {
    energy: (r.EnergyLimit ?? 0) - (r.EnergyUsed ?? 0),
    bandwidth:
      (r.freeNetLimit ?? 0) - (r.freeNetUsed ?? 0) + (r.NetLimit ?? 0) - (r.NetUsed ?? 0),
  };
}

/** USDT balance in whole tokens (6 decimals). */
export async function usdtBalance(address) {
  const { constant_result } = await tronWeb.transactionBuilder.triggerConstantContract(
    USDT,
    "balanceOf(address)",
    {},
    [{ type: "address", value: address }],
    address
  );
  return Number(BigInt("0x" + constant_result[0])) / 1e6;
}

/**
 * Energy a USDT transfer will consume. Simulates the call when the sender holds
 * enough USDT; otherwise falls back to the known costs (~65K to an address that
 * already holds USDT, ~131K to one that never has).
 */
export async function estimateUsdtEnergy(from, to, amount) {
  if ((await usdtBalance(from)) >= amount) {
    const sim = await tronWeb.transactionBuilder.triggerConstantContract(
      USDT,
      "transfer(address,uint256)",
      {},
      [
        { type: "address", value: to },
        { type: "uint256", value: Math.round(amount * 1e6) },
      ],
      from
    );
    if (sim.result?.result && sim.energy_used) return { energy: sim.energy_used, source: "simulated" };
  }
  const recipientHasUsdt = (await usdtBalance(to)) > 0;
  return { energy: recipientHasUsdt ? 65_000 : 131_000, source: "typical" };
}

/** Send USDT from SENDER_PRIVATE_KEY's address and return the fee receipt. */
export async function sendUsdt(to, amount) {
  const contract = await tronWeb.contract().at(USDT);
  const txid = await contract
    .transfer(to, Math.round(amount * 1e6))
    .send({ feeLimit: 30 * SUN_PER_TRX }); // cap the burn at 30 TRX if something is off

  // The receipt is available once the transaction is in a block (~3s). Read it from
  // the full node (not walletsolidity) so a single Full Node REST endpoint is enough.
  for (let i = 0; i < 20; i++) {
    const info = await tronWeb.fullNode.request("wallet/gettransactioninfobyid", { value: txid }, "post");
    if (info.id) {
      return {
        txid,
        result: info.receipt?.result ?? "SUCCESS",
        energyUsed: info.receipt?.energy_usage_total ?? 0,
        bandwidthUsed: info.receipt?.net_usage ?? 0,
        trxBurned: ((info.receipt?.energy_fee ?? 0) + (info.receipt?.net_fee ?? 0)) / SUN_PER_TRX,
      };
    }
    await new Promise((r) => setTimeout(r, 3_000));
  }
  return { txid, result: "PENDING" };
}
