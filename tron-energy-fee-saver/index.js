// index.js — plan, rent, and send a cheap USDT transfer
//   node index.js <from> <to> <amount>                 dry run (free)
//   node index.js <from> <to> <amount> --rent          rent Energy if cheaper than burning
//   node index.js <from> <to> <amount> --rent --send   rent, then send the USDT
import { planUsdtTransfer } from "./planner.js";
import { activateAddress, delegateEnergy, waitForOrder } from "./energy.js";
import { getResources, sendUsdt, tronWeb } from "./tron.js";

const [from, to, amountArg] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const rent = process.argv.includes("--rent");
const send = process.argv.includes("--send");

if (!from || !to || !amountArg) {
  console.error("Usage: node index.js <from> <to> <amount> [--rent] [--send]");
  process.exit(1);
}
const amount = Number(amountArg);
const fmt = (n) => n.toLocaleString("en-US");

const plan = await planUsdtTransfer(from, to, amount);

console.log(`\nUSDT transfer: ${amount} USDT  ${from} → ${to}`);
console.log(`  Sender activated      ${plan.activated ? "yes" : "no (activation ≈ 2.5 TRX)"}`);
console.log(`  Energy needed         ${fmt(plan.energyNeeded)} (${plan.energySource})`);
console.log(`  Energy available      ${fmt(plan.energyAvailable)}`);
console.log(`  Bandwidth available   ${fmt(plan.bandwidthAvailable)}`);
console.log(`  Burn cost (no rental) ${plan.burnTrx.toFixed(2)} TRX`);
if (plan.rentVolume) {
  const saved = (1 - plan.rentTrx / plan.burnTrx) * 100;
  console.log(`  Rental cost (1h)      ${plan.rentTrx.toFixed(2)} TRX ($${plan.rentUsd.toFixed(2)}) for ${fmt(plan.rentVolume)} Energy`);
  console.log(`  Decision              ${plan.decision.toUpperCase()}${plan.decision === "rent" ? ` — saves ${saved.toFixed(0)}%` : ""}`);
} else {
  console.log("  Decision              NO RENTAL NEEDED — sender already has the Energy");
}

if (rent && plan.decision === "rent") {
  if (!plan.activated) {
    const activation = await activateAddress(from);
    console.log(`\nActivated ${from} for ${activation.price_trx} TRX ($${activation.price_usd})`);
  }

  const order = await delegateEnergy(from, plan.rentVolume, "1h");
  console.log(`\nRented ${fmt(order.volume)} Energy — order ${order.orderId}, status ${order.status}`);
  const confirmed = await waitForOrder(order.orderId);
  console.log(`  Order ${confirmed.status}: $${confirmed.price_usd}, txid ${confirmed.txid}`);

  const after = await getResources(from);
  console.log(`  Energy now available  ${fmt(after.energy)}`);
}

if (send) {
  if (!process.env.SENDER_PRIVATE_KEY) throw new Error("Set SENDER_PRIVATE_KEY to send");
  if (tronWeb.defaultAddress.base58 !== from) throw new Error("SENDER_PRIVATE_KEY does not match <from>");

  const receipt = await sendUsdt(to, amount);
  console.log(`\nSent ${amount} USDT — txid ${receipt.txid}`);
  console.log(`  Result                ${receipt.result}`);
  console.log(`  Energy used           ${fmt(receipt.energyUsed ?? 0)}`);
  console.log(`  Bandwidth used        ${fmt(receipt.bandwidthUsed ?? 0)}`);
  console.log(`  TRX burned            ${(receipt.trxBurned ?? 0).toFixed(6)} TRX`);
}
