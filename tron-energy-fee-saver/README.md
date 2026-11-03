# TRON Energy Fee Saver

Cut USDT (TRC-20) transfer fees on TRON by renting Energy with the [GetBlock TRON Energy API](https://docs.getblock.io/tron-energy/introduction) instead of burning TRX.

For a transfer from `<from>` to `<to>`, the script:

1. Estimates the Energy the transfer needs (simulated, or ~65K / ~131K depending on the recipient).
2. Compares the TRX you'd burn against a live 1-hour rental quote.
3. With `--rent`, activates the sender if needed, rents only the missing Energy, and waits for the order.
4. With `--send`, sends the USDT and prints the fee receipt.

## Setup

```bash
npm install
cp .env.example .env   # then fill in the values
```

| Variable              | Where to get it                                                              |
| --------------------- | ---------------------------------------------------------------------------- |
| `GETBLOCK_ENERGY_KEY` | GetBlock dashboard → **Settings → API Keys**                                 |
| `TRON_RPC_URL`        | GetBlock dashboard → **RPC → Shared Node** → TRON Mainnet, **Full Node REST** endpoint |
| `SENDER_PRIVATE_KEY`  | Only for `--send`: the private key of `<from>`                               |

## Usage

```bash
node index.js <from> <to> <amount>                 # dry run — free
node index.js <from> <to> <amount> --rent          # rent Energy if cheaper than burning
node index.js <from> <to> <amount> --rent --send   # rent, then send the USDT
```

`--rent` and `--send` spend real funds on TRON mainnet.

## Files

| File         | What it does                                                        |
| ------------ | ------------------------------------------------------------------- |
| `energy.js`  | GetBlock TRON Energy API client with idempotency keys and polling   |
| `tron.js`    | TronWeb reads (resources, USDT balance, Energy simulation) and send |
| `planner.js` | Rent-vs-burn decision for one transfer                              |
| `index.js`   | CLI entry point                                                     |

Full walkthrough: [How to Cut USDT Transfer Fees on TRON by Renting Energy with GetBlock](https://docs.getblock.io/guides/how-to-cut-usdt-transfer-fees-on-tron-by-renting-energy-with-getblock)
