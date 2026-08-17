# Blockbook UTXO planner

Decide which unspent outputs to spend for a Bitcoin payment, and what it will
cost, using GetBlock's [Blockbook add-on](https://docs.getblock.io/add-ons/blockbook).

One file, no dependencies, no private keys, nothing signed or broadcast.

## What it does

Before a wallet can sign, it has to answer a question with no obvious answer:
given these unspent outputs, which ones do I spend, and what is the fee?

That question is circular. The fee is a price per virtual byte, so it depends on
the transaction's size; the size depends on how many inputs it has; and how many
inputs it needs depends on the fee. This planner resolves it the way Bitcoin Core
does — by switching to **effective value**, where every input pays for its own
fee up front and the target stops moving.

It then runs three selection strategies over the same UTXO set and prices each:

| Strategy | What it does | Why it matters |
| --- | --- | --- |
| **Changeless search** | Depth-first search for a subset landing just above the target | No change output: smaller transaction, no leftover dust, nothing linking this payment to the next |
| **Largest first** | Take the biggest outputs until covered | Fewest inputs and the smallest fee today — at the cost of leaving the wallet fragmented |
| **Random draw** | Draw at random until covered | Fragments the wallet less, which is what Core falls back to |

Three Blockbook endpoints supply every fact:

```
/api/v2/utxo/{address}   what is actually spendable, and what only looks it
/api/v2/estimatefee/{n}  what a confirmation within n blocks costs
/api/v2/feestats/{h}     what a recent block really charged
```

## Setup

Requires Node 20.6 or later.

```bash
cp .env.example .env
```

Set `BLOCKBOOK_URL` to a GetBlock Bitcoin endpoint with the Blockbook add-on
enabled. `SPEND_FROM` is prefilled with a busy public address whose UTXO set is
fragmented and dust-heavy — which is exactly what makes coin selection worth
watching.

## Run

```bash
npm start -- 0.0015                 # plan a 0.0015 BTC payment
node --env-file=.env plan.js 0.0015 --feerate 150     # force a feerate
node --env-file=.env plan.js 0.0015 --target 1        # detail the 1-block tier
node --env-file=.env plan.js 3.0 --from bc1q... --to bc1q... --min-conf 6
```

| Flag | Default | What it does |
| --- | --- | --- |
| `--from` | `SPEND_FROM` | Address to spend from |
| `--to` | `SEND_TO` | Recipient — only its script type affects the plan |
| `--feerate` | from the node | Override in sat/vB, instead of querying the estimator |
| `--target` | `6` | Confirmation target to write up in full |
| `--min-conf` | `MIN_CONFIRMATIONS` | Confirmations an output needs to be spendable |

## Notes

- **Two kinds of output look spendable and are not.** A coinbase output is locked
  by consensus for 100 blocks, and an unconfirmed output inherits its parent's
  replaceability. Both are excluded and counted separately, because confusing
  either for spendable value produces a plan that cannot be mined.
- **`estimatefee` returns BTC per kilo-virtual-byte, as a decimal string.**
  `"0.00001112"` is 1.11 sat/vB. This is the conversion that quietly goes wrong
  by a factor of a thousand.
- **Amounts are satoshis in `BigInt` from parse to print.** No value ever passes
  through a float.
- **Plans are compared by total cost, not by fee.** A changeless plan's fee has
  swallowed its leftover, so it looks expensive next to a plan that keeps change
  — but that change still has to be spent one day. Each plan is charged for what
  it leaves behind.
- **At a high enough feerate, outputs go out of play.** An output worth less than
  its own input costs is not spendable at any profit. Run `--feerate 250` against
  the default address to watch a real 0.023 BTC balance become entirely immobile.
- **Input sizes are per script type, and approximate for the general case.**
  P2PKH, P2SH-P2WPKH, P2WPKH and P2TR sizes are exact for single-key spends;
  P2WSH is a stand-in, since a script witness can be any size.
- **This is a planner, not a wallet.** It reads. Turning a plan into a
  transaction means building a PSBT and signing it, which needs keys this program
  never sees.

