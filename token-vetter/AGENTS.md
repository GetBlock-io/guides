# AGENTS.md - Token Vetter

This is a token due-diligence app that makes use of the GetBlock Rug Pull Check API to vet a token contract before listing or trading it, returning a clear GO / NO-GO verdict based on the risk model and detected red flags.

## Project structure

- `gate.js`: Decision factor — not present; see `vet.js`
- `index.js`: application entry code that supplies a candidate token contract and network, then calls the vetter
- `vet.js`: orchestrates vetting — pulls the risk model, prints the report, and returns a GO / NO-GO decision. Fails CLOSED on any error
- `rugpull.js`: calls the Rug Pull Check endpoint and returns the unwrapped result
- `flags.js`: collects disqualifying red flags (honeypot traps, owner privileges, extractive taxes, holder concentration)

## Supported networks

1. Ethereum (ETH): `eth`

2. BNB Smart Chain: `bsc` / `bnb`

3. Base: `base`

## Tech Stack

- Framework: Node.js
- Language: Javascript
- Package Manager: npm (only npm)
- Node Version: 22.x (required)

## Common Commands

- Git Clone: `git clone https://github.com/GetBlock-io/guides.git`
- Install deps: `npm install`
- Make Directory to this folder: `cd token-vetter`
- Set up ENV: `cp .env.example .env`
- Run Application: `node index.js`

### ⚠️ Ask First

- Adding new dependencies

### 🚫 Never

- Commit secrets or `.env` files
- Force push to main
