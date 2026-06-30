# AGENTS.md - WAllet Risk Gate

This is a compliance and risk management app that makes use of the GetBlock Wallet Risk API to scrutinize wallet addresses before performing any transaction activities, e.g. swap, payout, etc.

## Project structure

- `gate.js`: Decising factor whether a wallet may transact. Fails CLOSED on any error
- `index.js`: application entry code that takes the wallet address details and support network
- `screen.js`: Call wallet Risk Check endpoint and return the unwrapped result

## Suported networks

1. Ethereum(ETH): `eth`

2. BNB Smart Chain: `bsc`

3. Base : `base`

4. Polygon: `poly`

5. TRON: `tron`

## Tech Stack

- Framework: Node.js
- Language: Javascript
- Package Manager: npm( only npm)
- Node Version: Node Version: 22.x (required)

## Common Commands

- Git Clone: `git clone https://github.com/GetBlock-io/guides.git`
- Install deps: `npm install`
- Make Directory to this folder: `cd wallet-risk-gate`
- Set up ENV: `cp .env.example .env`
- Run Application: `node index.js`

### ⚠️ Ask First

- Adding new dependencies

### 🚫 Never

- Commit secrets or `.env` files
- Force push to main
