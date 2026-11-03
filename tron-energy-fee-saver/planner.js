// planner.js — decide whether renting Energy beats burning TRX for one USDT transfer
import { priceEstimate } from "./energy.js";
import {
  getBurnPrices,
  getResources,
  isActivated,
  estimateUsdtEnergy,
  SUN_PER_TRX,
} from "./tron.js";

const MIN_ENERGY_ORDER = 32_000; // API minimum for delegate-energy
const ENERGY_BUFFER = 1_000; // delegations can land 1 unit short; don't burn for the remainder
const USDT_TX_BANDWIDTH = 345; // bytes for a typical TRC-20 transfer

/**
 * Work out what a USDT transfer from `from` to `to` will cost with and without
 * rented Energy. Only `price-estimate` is called, so planning is free.
 */
export async function planUsdtTransfer(from, to, amount, duration = "1h") {
  // Sequential on purpose: keeps us under per-second limits on shared nodes.
  const activated = await isActivated(from);
  const burn = await getBurnPrices();
  const estimate = await estimateUsdtEnergy(from, to, amount);
  const available = activated ? await getResources(from) : { energy: 0, bandwidth: 0 };

  const shortfall = Math.max(0, estimate.energy - available.energy);
  // Bandwidth is not rented: the 1,000-unit minimum costs more than burning ~345 bytes.
  const bandwidthBurnTrx =
    available.bandwidth >= USDT_TX_BANDWIDTH ? 0 : (USDT_TX_BANDWIDTH * burn.bandwidthSun) / SUN_PER_TRX;
  const burnTrx = (shortfall * burn.energySun) / SUN_PER_TRX;

  const plan = {
    from,
    to,
    amount,
    activated,
    energyNeeded: estimate.energy,
    energySource: estimate.source,
    energyAvailable: available.energy,
    bandwidthAvailable: available.bandwidth,
    shortfall,
    burnTrx,
    bandwidthBurnTrx,
    rentVolume: 0,
    rentTrx: 0,
    rentUsd: 0,
    decision: "no-rent",
  };
  if (shortfall === 0) return plan; // already has enough Energy

  const rentVolume = Math.max(MIN_ENERGY_ORDER, Math.ceil((shortfall + ENERGY_BUFFER) / 1_000) * 1_000);
  const quote = await priceEstimate(rentVolume, duration);
  plan.rentVolume = rentVolume;
  plan.rentTrx = Number(quote.trx);
  plan.rentUsd = Number(quote.price_usd);
  plan.decision = plan.rentTrx < burnTrx ? "rent" : "burn";
  return plan;
}
