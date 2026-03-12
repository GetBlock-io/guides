# Priority Fees on Solana

Send SOL transactions with dynamic priority fees to improve landing rate.

---

## How It Works

Priority fees let you bid for higher scheduling priority on Solana:

```
Priority Fee = Compute Units × Price per CU (microLamports)
```

This script:

1. Simulates the transaction to estimate compute units
2. Fetches recent network fees and picks the 75th percentile
3. Builds and sends the final transaction with the right compute budget

---

## Setup

```bash
npm install
```

Create a `.env` file:

```bash
GETBLOCK_API_KEY=https://go.getblock.io/<your-api-key>
PRIVATE_KEY=<your-base58-private-key>
RECIPIENT_WALLET=<recipient-wallet-address>
```

---

## Run

```bash
npx ts-node index.ts
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GETBLOCK_API_KEY` | GetBlock RPC endpoint URL |
| `PRIVATE_KEY` | Your wallet's base58-encoded private key |
| `RECIPIENT_WALLET` | Recipient's Solana wallet address |

---

## Resources

- [Solana Priority Fees Docs](https://solana.com/docs/core/fees)
- [GetBlock Solana RPC](https://getblock.io)
- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
