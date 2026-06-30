# AGENTS.md - Smart Onboarding

This is a smart user-onboarding app that makes use of the GetBlock Full Wallet Audit API to screen a new wallet for AML / fraud risk and, once cleared, build a personalized onboarding flow from the wallet's behavioral profile, predicted intentions, and protocol history.

## Project structure

- `index.js`: application entry code that supplies a new user wallet and network, runs onboarding, and picks the experience track (beginner / intermediate / pro)
- `onboard.js`: AML screening gate followed by behavioral profiling and personalization. Fails CLOSED on any error
- `audit.js`: calls the Full Wallet Audit endpoint and returns the unwrapped result

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
- Make Directory to this folder: `cd smart-onboarding`
- Set up ENV: `cp .env.example .env`
- Run Application: `node index.js`

### ⚠️ Ask First

- Adding new dependencies

### 🚫 Never

- Commit secrets or `.env` files
- Force push to main
