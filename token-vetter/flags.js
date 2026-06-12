const MAX_BUY_TAX = 10; // percent
const MAX_SELL_TAX = 10; // percent
const MAX_HOLDER_CONCENTRATION = 50; // percent held by the top holder

export function collectRedFlags(r) {
  const ind = r.risk_indicators;
  const flags = [];

  // Hard traps — disqualifying on their own.
  if (ind.is_honeypot) flags.push("honeypot: buyers cannot sell");
  if (ind.cannot_sell_all) flags.push("cannot sell all tokens");
  if (ind.cannot_buy) flags.push("buying is disabled");
  if (ind.selfdestruct) flags.push("contract can self-destruct");
  if (ind.honeypot_with_same_creator)
    flags.push("creator deployed other honeypots");

  // Owner privileges — centralization / soft-rug risk.
  if (ind.is_mintable) flags.push("owner can mint new supply");
  if (ind.can_take_back_ownership) flags.push("ownership can be reclaimed");
  if (ind.hidden_owner) flags.push("hidden owner");
  if (ind.owner_change_balance) flags.push("owner can change balances");
  if (ind.transfer_pausable) flags.push("transfers can be paused");
  if (ind.slippage_modifiable) flags.push("slippage/tax is modifiable");
  if (ind.is_blacklisted) flags.push("contract can blacklist addresses");

  // Extractive taxes (stored as fractions).
  if (ind.buy_tax * 100 > MAX_BUY_TAX)
    flags.push(`buy tax ${(ind.buy_tax * 100).toFixed(1)}%`);
  if (ind.sell_tax * 100 > MAX_SELL_TAX)
    flags.push(`sell tax ${(ind.sell_tax * 100).toFixed(1)}%`);

  // Transparency.
  if (!ind.is_open_source) flags.push("source code not verified");

  // Holder concentration — top holder controls too much.
  const top = ind.holders?.[0];
  if (top) {
    const pct = Number.parseFloat(top.percent) * 100;
    if (Number.isFinite(pct) && pct > MAX_HOLDER_CONCENTRATION) {
      flags.push(
        `top holder controls ${pct.toFixed(1)}% (${top.tag || "unlabeled"})`,
      );
    }
  }

  return flags;
}
