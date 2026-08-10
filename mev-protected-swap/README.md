# MEV-protected swap

A PancakeSwap CLI that routes every transaction through a GetBlock endpoint
with the MEV Protection add-on, so your swap never sits in the public mempool
where sandwich bots can see it.

## Setup

```bash
npm install
cp .env.example .env   # add your key and your MEV-protected endpoint
```

## Swap

Swaps BNB to USDT by default:

```bash
npm run swap -- --amount 0.0017
```

```text
Swap 0.0017 BNB -> USDT
  expected      1.023549368905350782 USDT
  min received  1.018431622060824028 USDT (0.5% slippage)
  wallet        0x1a2b...

Sending swap through the MEV-protected endpoint...
  tx 0x9f2c...
  mined in block 68412771
  received 1.023549368905350782 USDT
```

Slippage tolerance defaults to 0.5% and can be overridden:

```bash
npm run swap -- --amount 0.0017 --slippage 1
```

## What the add-on changes

Nothing in the swap code. There is no bundle format, no special RPC method, no
extra signature — [index.js](index.js) calls `swapExactETHForTokens` exactly as
it would against any BSC node. The protection is the endpoint: point
`BSC_MEV_RPC` at an MEV-protected endpoint and the transaction goes to a
private mempool instead of the public one.

Slippage is a separate control and still matters. MEV Protection stops the
sandwich from happening; `--slippage` caps your loss if the price simply moves
while you wait.

## Cost

Real swaps on BSC mainnet. `0.0017` BNB is about $1 at the time of writing —
enough to see a real fill without risking much. Gas on BSC adds roughly
$0.05–0.10 per swap, so a wallet holding $7 of BNB covers several runs.

There is no token approval to pay for. BNB is BSC's native coin rather than an
ERC-20, so the router needs no permission to spend it — the swap is a single
transaction.
