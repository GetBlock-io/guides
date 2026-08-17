/**
 * Plan and price a Bitcoin spend, from Blockbook's UTXO and fee-estimate endpoints.
 *
 * Nothing here signs or broadcasts anything. It answers the question every wallet
 * has to answer before it can sign: given these unspent outputs, which ones do I
 * spend to send this amount, and what will it cost?
 *
 * That question is harder than it looks, because the fee depends on the size of
 * the transaction, the size depends on how many inputs it has, and how many
 * inputs it has depends on the fee. Three endpoints supply the facts:
 *
 *   /api/v2/utxo/{address}   ->  what is actually spendable, and what only looks it
 *   /api/v2/estimatefee/{n}  ->  what a confirmation within n blocks costs
 *   /api/v2/feestats/{h}     ->  what a recent block really charged
 *
 *   node --env-file=.env plan.js 0.0015
 *   node --env-file=.env plan.js 0.0015 --feerate 150
 *   node --env-file=.env plan.js 0.0015 --from bc1q... --to bc1q... --min-conf 6
 */

// ---------------------------------------------------------------------------
// Arguments and configuration.
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);

// Split the arguments once: `--name value` pairs into a map, everything else
// into positionals. Scanning for each flag separately is how a value that looks
// like a flag ends up being read as one.
const flags = new Map();
const positional = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) flags.set(args[i].slice(2), args[++i]);
  else positional.push(args[i]);
}

const flag = (name) => flags.get(name);

const baseUrl = (process.env.BLOCKBOOK_URL ?? '').replace(/\/+$/, '');
const amountArg = positional[0];
const from = flag('from') ?? process.env.SPEND_FROM;
const to = flag('to') ?? process.env.SEND_TO;
const minConf = Number(flag('min-conf') ?? process.env.MIN_CONFIRMATIONS ?? 1);
const feerateOverride = flag('feerate') === undefined ? undefined : Number(flag('feerate'));
const primaryTarget = Number(flag('target') ?? 6);

// Name what is actually missing. Four separate requirements behind one message
// sends you to check the .env you already filled in, when the real problem was a
// forgotten argument.
const missing = [
  [!amountArg, 'an amount in BTC as the first argument, e.g. 0.0015'],
  [!baseUrl, 'BLOCKBOOK_URL in .env (copy .env.example first)'],
  [!from, 'an address to spend from: SPEND_FROM in .env, or --from'],
  [!to, 'a recipient: SEND_TO in .env, or --to'],
].filter(([absent]) => absent);

if (missing.length > 0) {
  console.error('Usage: node --env-file=.env plan.js <amount-in-BTC> [--from addr] [--to addr]');
  console.error('             [--feerate sat/vB] [--target blocks] [--min-conf n]\n');
  console.error('Missing:');
  for (const [, what] of missing) console.error(`  - ${what}`);
  console.error('\n  node --env-file=.env plan.js 0.0015');
  console.error('  npm start -- 0.0015      # the -- is what passes the amount through npm');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Satoshi arithmetic.
//
// Every amount is a BigInt count of satoshis, and it stays one from the moment
// it is parsed to the moment it is printed. A wallet that puts a satoshi value
// through a float is a wallet that eventually sends the wrong amount: 0.1 + 0.2
// is not 0.3, and here that is somebody's money.
// ---------------------------------------------------------------------------

/** Parse a decimal BTC string ("0.0015") into satoshis, without touching a float. */
function toSats(btc) {
  const match = String(btc).trim().match(/^(\d*)(?:\.(\d{0,8})\d*)?$/);
  if (!match) throw new Error(`not a BTC amount: ${btc}`);
  const [, whole = '0', fraction = ''] = match;
  return BigInt((whole || '0') + fraction.padEnd(8, '0'));
}

/** Format satoshis as BTC, right-padded so columns line up. */
function btc(sats) {
  const negative = sats < 0n;
  const digits = String(negative ? -sats : sats).padStart(9, '0');
  return `${negative ? '-' : ''}${digits.slice(0, -8)}.${digits.slice(-8)}`;
}

/** Multiply a vsize by a feerate given in sat/kvB, rounding the fee up. */
function feeFor(vsize, satPerKvB) {
  return (BigInt(Math.ceil(vsize)) * satPerKvB + 999n) / 1000n;
}

// ---------------------------------------------------------------------------
// Transaction sizing.
//
// The fee is a price per virtual byte, so a planner that cannot size a
// transaction cannot price one. These are the standard vsize contributions per
// script type: an input's cost includes its witness, discounted by the segwit
// factor of four, which is the whole reason a native segwit input is cheaper to
// spend than a legacy one.
// ---------------------------------------------------------------------------
const SCRIPTS = {
  p2pkh: { input: 148, output: 34, segwit: false },
  'p2sh-p2wpkh': { input: 91, output: 32, segwit: true },
  p2wpkh: { input: 68, output: 31, segwit: true },
  p2wsh: { input: 105, output: 43, segwit: true },
  p2tr: { input: 58, output: 43, segwit: true },
};

/**
 * Work out a script type from the address itself. The prefix names the encoding
 * and the length separates the two bech32 witness sizes.
 */
function scriptTypeOf(address) {
  const a = address.trim();
  const bech32 = a.match(/^(bc1|tb1|bcrt1)(.*)$/i);
  if (bech32) {
    const data = bech32[2];
    if (/^p/i.test(data)) return 'p2tr';
    return data.length > 45 ? 'p2wsh' : 'p2wpkh';
  }
  if (/^[mn2]/.test(a)) return a.startsWith('2') ? 'p2sh-p2wpkh' : 'p2pkh';
  if (a.startsWith('3')) return 'p2sh-p2wpkh';
  if (a.startsWith('1')) return 'p2pkh';
  throw new Error(`cannot tell the script type of ${a}`);
}

/**
 * Size a transaction with `inputs` inputs of one type and the given outputs.
 * Overhead is version, both varint counts and locktime; a segwit transaction
 * adds a marker and a flag byte, which the witness discount turns into half a
 * virtual byte.
 */
function vsizeOf(inputs, inputType, outputTypes) {
  const overhead = 10 + (SCRIPTS[inputType].segwit ? 0.5 : 0);
  const inputCost = inputs * SCRIPTS[inputType].input;
  const outputCost = outputTypes.reduce((total, type) => total + SCRIPTS[type].output, 0);
  return Math.ceil(overhead + inputCost + outputCost);
}

/**
 * The smallest change output worth creating. Below this, an output costs more to
 * spend later than it is worth, and the network will not relay it: Bitcoin Core
 * prices dust at the dust relay fee -- 3 sat/vB by default -- over the output's
 * own size plus the size of the input that would one day spend it.
 */
function dustThreshold(type) {
  return BigInt(Math.ceil((SCRIPTS[type].output + SCRIPTS[type].input) * 3));
}

// ---------------------------------------------------------------------------
// Blockbook.
// ---------------------------------------------------------------------------
async function blockbook(path) {
  const response = await fetch(`${baseUrl}${path}`);
  const text = await response.text();

  let body;
  try {
    body = JSON.parse(text);
  } catch {
    // A REST endpoint answering with HTML is Blockbook's explorer page, which
    // means the path was wrong -- not that the chain said no.
    throw new Error(`${path} did not return JSON (HTTP ${response.status})`);
  }
  if (body?.error) throw new Error(`${path}: ${body.error}`);
  return body;
}

/**
 * Fee estimates for a set of confirmation targets, as sat/kvB.
 *
 * Blockbook hands back the node's own estimator, in BTC per kilo-virtual-byte
 * as a decimal string -- so "0.00001112" is 1112 sat/kvB, or 1.11 sat/vB. The
 * conversion is where a planner quietly goes wrong by a factor of a thousand.
 *
 * The node only estimates over a bounded horizon; outside it, the request fails
 * rather than returning a best guess, so a missing tier is skipped instead of
 * being allowed to abort the run.
 */
async function feeEstimates(targets) {
  const settled = await Promise.allSettled(
    targets.map(async (blocks) => ({
      blocks,
      satPerKvB: toSats((await blockbook(`/api/v2/estimatefee/${blocks}`)).result),
    })),
  );
  return settled
    .filter((entry) => entry.status === 'fulfilled' && entry.value.satPerKvB > 0n)
    .map((entry) => entry.value);
}

// ---------------------------------------------------------------------------
// Coin selection.
//
// Selection runs in "effective value": an output's value minus what it costs to
// spend it at the current feerate. That single change of units removes the
// circularity between fee and input count -- once each input pays for itself,
// the target no longer moves as inputs are added, and the leftover at the end is
// exactly the change.
// ---------------------------------------------------------------------------

/**
 * Search for a combination that needs no change output at all, within a window
 * above the target. This is the selection every wallet wants and few find: no
 * change output means a smaller transaction, a smaller fee, no leftover dust to
 * spend later, and nothing linking this payment to the next one.
 *
 * The window is the cost of change -- what a change output would cost to create
 * now plus what it would cost to spend later. Overshooting the target by less
 * than that is cheaper than taking the change, so the excess goes to the miner.
 *
 * Depth-first with two prunes (overshoot, and cannot-reach from the remaining
 * total), capped by a try budget because the search space is exponential.
 */
function selectChangeless(candidates, target, window, maxTries = 100_000) {
  const n = candidates.length;

  // Suffix sums: the most that can still be added from position i onwards.
  const remaining = new Array(n + 1).fill(0n);
  for (let i = n - 1; i >= 0; i--) remaining[i] = remaining[i + 1] + candidates[i].effective;

  let best = null;
  let tries = 0;
  const chosen = [];

  function search(index, total) {
    if (tries++ > maxTries) return;

    if (total > target + window) return; // Overshot the window.
    if (total >= target) {
      const excess = total - target;
      if (!best || excess < best.excess) best = { excess, indexes: [...chosen] };
      return; // Adding more can only overshoot further.
    }
    if (index >= n) return;
    if (total + remaining[index] < target) return; // Cannot reach the target from here.

    chosen.push(index);
    search(index + 1, total + candidates[index].effective);
    chosen.pop();

    search(index + 1, total);
  }

  search(0, 0n);
  return best;
}

/** Take the largest outputs until the target is covered. */
function selectLargestFirst(candidates, target) {
  const indexes = [];
  let total = 0n;
  for (let i = 0; i < candidates.length && total < target; i++) {
    indexes.push(i);
    total += candidates[i].effective;
  }
  return total >= target ? { indexes, total } : null;
}

/**
 * Draw outputs at random until the target is covered.
 *
 * Not a worse version of largest-first: it fragments the wallet less. Always
 * spending the largest output leaves nothing but small ones behind, so the fee
 * saved today is paid back with interest on the day the wallet has to spend
 * forty dust outputs at once. Bitcoin Core falls back to this for the same
 * reason.
 */
function selectRandom(candidates, target, random = Math.random) {
  const order = candidates.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const indexes = [];
  let total = 0n;
  for (const i of order) {
    if (total >= target) break;
    indexes.push(i);
    total += candidates[i].effective;
  }
  return total >= target ? { indexes, total } : null;
}

/**
 * Turn a set of chosen outputs into a costed plan, deciding whether the leftover
 * is worth keeping as change or should be handed to the miner as fee.
 *
 * `totalCost` is what makes two plans comparable. Comparing fees alone is
 * misleading: a changeless plan's fee has swallowed the leftover, so it looks
 * expensive next to a plan that keeps its change -- but that change still has to
 * be spent one day, and paying for its input then is a real cost deferred, not
 * avoided. Charging each plan for the change it leaves behind puts both on the
 * same footing.
 */
function cost(indexes, candidates, { amount, satPerKvB, inputType, toType, changeType }) {
  const inputs = indexes.map((i) => candidates[i]);
  const gross = inputs.reduce((total, utxo) => total + utxo.value, 0n);

  const withChange = vsizeOf(inputs.length, inputType, [toType, changeType]);
  const withoutChange = vsizeOf(inputs.length, inputType, [toType]);
  const change = gross - amount - feeFor(withChange, satPerKvB);

  // A change output below the dust threshold cannot be relayed and would cost
  // more to spend than it holds. Drop it, and the whole leftover becomes fee.
  if (change < dustThreshold(changeType)) {
    const fee = gross - amount;
    return {
      inputs,
      gross,
      change: 0n,
      vsize: withoutChange,
      fee,
      overpaid: fee - feeFor(withoutChange, satPerKvB),
      totalCost: fee,
    };
  }

  const fee = feeFor(withChange, satPerKvB);
  return {
    inputs,
    gross,
    change,
    vsize: withChange,
    fee,
    overpaid: 0n,
    totalCost: fee + feeFor(SCRIPTS[changeType].input, satPerKvB),
  };
}

/** Run every strategy at one feerate and return the costed plans. */
function planAt(spendable, { amount, satPerKvB, inputType, toType, changeType }) {
  const inputFee = feeFor(SCRIPTS[inputType].input, satPerKvB);

  // An output whose value does not cover the fee for its own input is not worth
  // spending: including it makes the transaction more expensive, not less short.
  const candidates = spendable
    .map((utxo) => ({ ...utxo, effective: utxo.value - inputFee }))
    .filter((utxo) => utxo.effective > 0n)
    .sort((a, b) => (b.effective > a.effective ? 1 : b.effective < a.effective ? -1 : 0));

  const uneconomic = spendable.length - candidates.length;
  const context = { amount, satPerKvB, inputType, toType, changeType };

  // Two targets, in effective-value terms. Neither moves as inputs are added.
  const targetWithChange = amount + feeFor(vsizeOf(0, inputType, [toType, changeType]), satPerKvB);
  const targetChangeless = amount + feeFor(vsizeOf(0, inputType, [toType]), satPerKvB);

  // The cost of change: creating one now, and spending it some day.
  const window =
    feeFor(SCRIPTS[changeType].output, satPerKvB) + feeFor(SCRIPTS[changeType].input, satPerKvB);

  const available = candidates.reduce((total, utxo) => total + utxo.effective, 0n);
  if (available < targetChangeless) {
    return { candidates, uneconomic, available, plans: [], short: targetWithChange - available };
  }

  const plans = [];

  // The changeless search often finds nothing, and that is not a failure of the
  // search -- a wallet holding four large outputs simply has no subset that lands
  // within a hundred satoshis of the target. Reporting the miss is the honest
  // result, and it is the reason a wallet needs the fallbacks below at all.
  const changeless = selectChangeless(candidates, targetChangeless, window);
  if (changeless) {
    plans.push({ strategy: 'changeless search', ...cost(changeless.indexes, candidates, context) });
  } else {
    plans.push({ strategy: 'changeless search', missing: 'no combination within the window' });
  }

  const largest = selectLargestFirst(candidates, targetWithChange);
  if (largest) {
    plans.push({ strategy: 'largest first', ...cost(largest.indexes, candidates, context) });
  }

  const random = selectRandom(candidates, targetWithChange);
  if (random) {
    plans.push({ strategy: 'random draw', ...cost(random.indexes, candidates, context) });
  }

  return { candidates, uneconomic, available, plans, short: 0n };
}

// ---------------------------------------------------------------------------
// Report.
// ---------------------------------------------------------------------------
const pad = (value, width) => String(value).padStart(width);
const satPerVb = (satPerKvB) => (Number(satPerKvB) / 1000).toFixed(2);

/**
 * The best plan is the one that costs the wallet least overall, and the
 * tie-break is fewer inputs: a plan that consumes less of the wallet leaves more
 * of it usable, and a smaller transaction reveals less about what else is there.
 */
const bestOf = (plans) =>
  plans
    .filter((plan) => !plan.missing)
    .reduce((a, b) =>
      b.totalCost < a.totalCost || (b.totalCost === a.totalCost && b.inputs.length < a.inputs.length)
        ? b
        : a,
    );

/** Did any strategy actually produce a costed plan? */
const anyPlan = (plans) => plans.some((plan) => !plan.missing);

async function main() {
  const amount = toSats(amountArg);
  const inputType = scriptTypeOf(from);
  const toType = scriptTypeOf(to);
  const changeType = inputType; // Change comes home to the same kind of script.

  const [status, utxos] = await Promise.all([
    blockbook('/api/v2'),
    blockbook(`/api/v2/utxo/${from}`),
  ]);

  const height = status.blockbook.bestHeight;
  const ticker = status.blockbook.network;

  console.log(`Blockbook  ${status.blockbook.coin} at height ${height}`);
  if (!status.blockbook.inSync) {
    // A lagging index reports stale confirmation counts, which is how a planner
    // ends up spending an output that has already been spent.
    console.log('  WARNING: the index is not in sync with its node');
  }

  // Classify before selecting. Two kinds of output look spendable in a balance
  // and are not, and both have to be excluded by hand.
  const spendable = [];
  let immature = 0;
  let tooNew = 0;
  let held = 0n;

  for (const utxo of utxos) {
    const value = BigInt(utxo.value);
    const confirmations = utxo.confirmations ?? 0;
    held += value;

    // A coinbase output cannot be spent for 100 blocks. It is not a policy
    // choice: a consensus rule rejects the transaction, so this exclusion is
    // the difference between a valid plan and an invalid one.
    if (utxo.coinbase && confirmations < 100) {
      immature++;
      continue;
    }
    if (confirmations < minConf) {
      tooNew++;
      continue;
    }
    spendable.push({ txid: utxo.txid, vout: utxo.vout, value, confirmations });
  }

  const spendableTotal = spendable.reduce((total, utxo) => total + utxo.value, 0n);

  console.log(`\nSpending from  ${from}`);
  console.log(`  script type  ${inputType}`);
  console.log(`  ${utxos.length} unspent output(s), ${btc(held)} ${ticker} held`);
  console.log(`  ${spendable.length} spendable, ${btc(spendableTotal)} ${ticker}`);
  if (tooNew) console.log(`    ${pad(tooNew, 5)} below ${minConf} confirmation(s)`);
  if (immature) console.log(`    ${pad(immature, 5)} immature coinbase (locked for 100 blocks)`);

  console.log(`\nPaying         ${btc(amount)} ${ticker}`);
  console.log(`  to           ${to}`);
  console.log(`  script type  ${toType}`);

  // Fee estimates, plus what a real block actually charged. The estimator
  // predicts; feestats reports. Comparing them is how you notice the estimator
  // is stale or the mempool has just turned.
  const tiers = feerateOverride
    ? [{ blocks: null, satPerKvB: BigInt(Math.round(feerateOverride * 1000)) }]
    : await feeEstimates([1, 3, 6, 144]);

  if (tiers.length === 0) {
    console.error('\nNo fee estimate available -- the node returned none for any target.');
    process.exit(1);
  }

  if (feerateOverride) {
    console.log(`\nFeerate        ${feerateOverride.toFixed(2)} sat/vB (given on the command line)`);
  } else {
    console.log('\nFee estimates  /api/v2/estimatefee');
    for (const tier of tiers) {
      console.log(`  ${`${tier.blocks} block(s)`.padEnd(13)}${pad(satPerVb(tier.satPerKvB), 6)} sat/vB`);
    }
    try {
      // The estimator predicts; feestats reports what a block actually charged.
      // Comparing them is how you notice an estimate that has gone stale.
      const stats = await blockbook(`/api/v2/feestats/${height - 5}`);
      const median = stats.decilesFeePerKb?.[5];
      console.log(
        `  block ${height - 5} really paid ${(stats.averageFeePerKb / 1000).toFixed(2)} sat/vB on average` +
          (median ? `, ${(median / 1000).toFixed(2)} median, over ${stats.txCount} transactions` : ''),
      );
    } catch {
      // feestats is a nicety; a missing block should not sink the run.
    }
  }

  // One tier gets the full write-up. The rest become a sensitivity table, which
  // is the more useful artefact: the same payment is a different transaction at
  // a different feerate, and seeing how differently is the point.
  const primary = tiers.find((tier) => tier.blocks === primaryTarget) ?? tiers[0];
  const planFor = (tier) =>
    planAt(spendable, { amount, satPerKvB: tier.satPerKvB, inputType, toType, changeType });

  const result = planFor(primary);
  const label = primary.blocks
    ? `${satPerVb(primary.satPerKvB)} sat/vB, targeting ${primary.blocks} block(s)`
    : `${satPerVb(primary.satPerKvB)} sat/vB`;

  console.log(`\nSelection at ${label}`);

  if (result.uneconomic) {
    // At a high enough feerate an output costs more to spend than it holds. The
    // coins are not gone; they are stranded until fees fall.
    console.log(
      `  ${result.uneconomic} output(s) cost more to spend than they hold at this feerate, and are out of play`,
    );
  }

  if (!anyPlan(result.plans)) {
    if (result.candidates.length === 0) {
      // Every output is worth less than its own input costs. The balance is real
      // and none of it can move -- the clearest possible statement of what
      // fragmentation costs, and it needs no rescue plan, only cheaper fees.
      console.log(
        `  Every output is uneconomic at this feerate: ${btc(spendableTotal)} ${ticker} is held here,`,
      );
      console.log('  and none of it can move until fees fall.');
    } else {
      console.log(`  Not enough spendable value: short by ${btc(result.short)} ${ticker}.`);
      console.log(`  ${btc(result.available)} ${ticker} is left once each input pays for its own fee.`);
    }
    process.exit(1);
  }

  console.log('\n  strategy            inputs   vsize   fee sats     change BTC   total sats');
  for (const plan of result.plans) {
    if (plan.missing) {
      console.log(`  ${plan.strategy.padEnd(18)}  ${plan.missing}`);
      continue;
    }
    console.log(
      `  ${plan.strategy.padEnd(18)}  ${pad(plan.inputs.length, 6)}  ${pad(plan.vsize, 6)}  ${pad(plan.fee, 8)}  ${
        plan.change === 0n ? pad('none', 13) : pad(btc(plan.change), 13)
      }  ${pad(plan.totalCost, 10)}`,
    );
  }

  const best = bestOf(result.plans);

  console.log(`\n  Best: ${best.strategy}`);
  console.log(`    ${best.inputs.length} input(s) worth ${btc(best.gross)} ${ticker}, ${best.vsize} vB`);
  console.log(`    ${btc(amount)} to the recipient`);
  if (best.change > 0n) console.log(`    ${btc(best.change)} back as change`);
  console.log(`    ${btc(best.fee)} to fees`);
  if (best.change === 0n) {
    console.log(
      `\n    No change output: the ${best.overpaid} sats over the target go to the miner rather than`,
    );
    console.log('    into an output that would cost more to spend later than it is worth. The');
    console.log('    transaction is smaller, and nothing links this payment to the next one.');
  }

  const shown = best.inputs.slice(0, 8);
  console.log('\n    inputs');
  for (const utxo of shown) {
    console.log(
      `      ${utxo.txid.slice(0, 16)}…:${String(utxo.vout).padEnd(3)} ${btc(utxo.value)}  ${pad(utxo.confirmations, 6)} conf`,
    );
  }
  if (best.inputs.length > shown.length) {
    console.log(`      … and ${best.inputs.length - shown.length} more`);
  }

  if (tiers.length > 1) {
    console.log('\nThe same payment across every fee tier');
    console.log('\n  target         sat/vB   inputs   fee sats   change BTC   strategy');
    for (const tier of tiers) {
      const tierResult = planFor(tier);
      if (!anyPlan(tierResult.plans)) {
        console.log(`  ${`${tier.blocks} block(s)`.padEnd(13)}${pad(satPerVb(tier.satPerKvB), 6)}   (nothing spendable at this feerate)`);
        continue;
      }
      const pick = bestOf(tierResult.plans);
      console.log(
        `  ${`${tier.blocks} block(s)`.padEnd(13)}${pad(satPerVb(tier.satPerKvB), 6)}  ${pad(pick.inputs.length, 7)}  ${pad(pick.fee, 8)}  ${
          pick.change === 0n ? pad('none', 11) : pad(btc(pick.change), 11)
        }   ${pick.strategy}`,
      );
    }
  }

  console.log('\nNothing was signed and nothing was broadcast. This is a plan, not a transaction.');
}

main().catch((error) => {
  console.error(`\nFailed: ${error.message}`);
  process.exit(1);
});
