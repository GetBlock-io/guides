// energy.js — thin client for the GetBlock TRON Energy API
import "dotenv/config";
import { randomUUID } from "node:crypto";

const BASE_URL = "https://services.getblock.io/v1/tron-energy";

/**
 * Call a TRON Energy endpoint and return the unwrapped `data` object.
 * Write endpoints get an Idempotency-Key so a retry never double-charges.
 */
async function energyRequest(method, path, body, idempotencyKey) {
  const apiKey = process.env.GETBLOCK_ENERGY_KEY;
  if (!apiKey) throw new Error("Set GETBLOCK_ENERGY_KEY in your .env file");

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;

  const res = await fetch(`${BASE_URL}/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.data) {
    throw new Error(`TRON Energy ${path} failed (HTTP ${res.status}): ${json.error ?? "empty response"}`);
  }
  return { status: res.status, ...json.data }; // unwrap the { data, error } envelope
}

/** Free quote: what would `volume` Energy (or Bandwidth) cost for `duration`? */
export function priceEstimate(volume, duration = "1h", resourceType = "energy") {
  return energyRequest("POST", "price-estimate", { resourceType, volume, duration });
}

/** Rent Energy to `address`. Charges your balance. */
export function delegateEnergy(address, volume, duration = "1h", idempotencyKey = randomUUID()) {
  return energyRequest(
    "POST",
    "delegate-energy",
    { target_address: address, volume, duration },
    idempotencyKey
  );
}

/** Create a never-used address on-chain so it can receive delegations. Charges your balance. */
export function activateAddress(address, idempotencyKey = randomUUID()) {
  return energyRequest("POST", "address-activate", { target_address: address }, idempotencyKey);
}

/** Look up an order placed with delegate-energy or delegate-bandwidth. */
export function getOrder(orderId) {
  return energyRequest("GET", `orders/${orderId}`);
}

/**
 * Poll an order until it is delivered (`charged`). Stops on any other status.
 * Orders return `success` (200) when delivered at once, or `accepted` (202) while pending.
 */
export async function waitForOrder(orderId, { timeoutMs = 60_000, intervalMs = 3_000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const order = await getOrder(orderId);
    if (order.status === "charged") return order;
    if (!["accepted", "success"].includes(order.status)) {
      throw new Error(`Order ${orderId} has unexpected status "${order.status}"`);
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Order ${orderId} not confirmed after ${timeoutMs / 1000}s`);
}
