# AGENTS.md - AML Deposit Screener

This is a compliance app that uses the GetBlock Crypto AML API to screen incoming deposits (a sender wallet or a transaction) before they are credited, and returns an ACCEPT / REVIEW / REJECT decision with an audit record.

## Project structure

- `aml.js`: Calls the Crypto AML `wallet-check` and `tx-check` endpoints and returns the unwrapped report
- `policy.js`: Maps the risk score to a risk band and turns a report into ACCEPT / REVIEW / REJECT with reasons
- `screener.js`: `screenDeposit()` — runs a check, applies the policy, fails CLOSED (REVIEW) on any error, and appends an audit record to `aml-audit.jsonl`
- `index.js`: CLI entry point

## Supported networks

1. Ethereum: `eth` (tx assets: `eth`, `usdt`, `usdc`)

2. TRON: `trx` (tx assets: `trx`, `usdt`)

3. Bitcoin: `btc`

4. Litecoin: `ltc`

5. Bitcoin Cash: `bch`

## Tech Stack

- Framework: Node.js
- Language: Javascript
- Package Manager: npm( only npm)
- Node Version: 18+ (built-in `fetch`)

## Common Commands

- Git Clone: `git clone https://github.com/GetBlock-io/guides.git`
- Make Directory to this folder: `cd aml-deposit-screener`
- Install deps: `npm install`
- Set up ENV: `cp .env.example .env`
- Screen a wallet: `node index.js wallet <address> <network>`
- Screen a transaction: `node index.js tx <txHash> <network> [asset]`

### ⚠️ Ask First

- Adding new dependencies

### 🚫 Never

- Commit secrets, `.env` files, or `aml-audit.jsonl`
- Force push to main
