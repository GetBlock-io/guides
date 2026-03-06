# Solana AI Agent

An interactive AI agent that can perform on-chain Solana actions — swaps, token transfers, and more — using natural language. Built with [GOAT SDK](https://ohmygoat.dev/), [LangGraph](https://langchain-ai.github.io/langgraph/), and OpenAI GPT-4o.

## Features

- **Token Swaps** via Jupiter aggregator
- **SPL Token** transfers and balance checks
- **Pump.fun** token interactions
- **Conversational memory** across a session (LangGraph MemorySaver)
- **Interactive CLI** — just type commands in plain English

## Prerequisites

- Node.js 18+
- A Solana wallet private key (base58-encoded)
- An OpenAI API key
- A Solana RPC URL (devnet or mainnet)

## Setup

1. **Clone the repo and navigate to this directory:**

   ```bash
   cd Solana-Agent
   ```

2. **Install dependencies:**

   ```bash
   pnpm add @goat-sdk/adapter-langchain @goat-sdk/core @goat-sdk/plugin-jupiter @goat-sdk/plugin-pumpfun @goat-sdk/plugin-spl-token @goat-sdk/wallet-solana @langchain/core @langchain/langgraph @langchain/openai @solana/web3.js bs58 dotenv
   ```

3. **Configure environment variables:**

   Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   |---|---|
   | `RPC_URL` | Solana RPC endpoint (devnet or mainnet via GetBlock) |
   | `SOLANA_PRIVATE_KEY` | Base58-encoded private key of your wallet |
   | `OPENAI_API_KEY` | Your OpenAI API key |

   > **Warning:** Never use your main wallet. Create a dedicated burner wallet for testing.

## Usage

Start the agent:

```bash
npm run dev
```

The CLI will prompt you to type commands:

```
Solana AI Agent ready. Type "exit" to quit.

You: What is my SOL balance?
Agent: Your current SOL balance is ...

You: Swap 0.01 SOL for USDC
Agent: ...

You: exit
```

Type `exit` to quit.

## How It Works

1. **Wallet** — Loads a Solana `Keypair` from your private key and connects to the RPC endpoint.
2. **GOAT Tools** — `getOnChainTools` wraps the wallet with on-chain capabilities (Jupiter, SPL tokens, Pump.fun) and exposes them as LangChain-compatible tools.
3. **LLM** — `ChatOpenAI` (GPT-4o) reasons over your input and decides which tools to call.
4. **Agent** — A LangGraph `createReactAgent` loop handles tool calling and maintains conversation memory within the session.

## Tech Stack

| Package | What it does |
|---|---|
| `@goat-sdk/core` | The brain of GOAT — connects your wallet to AI-usable tools |
| `@goat-sdk/wallet-solana` | Lets GOAT read and control your Solana wallet |
| `@goat-sdk/plugin-jupiter` | Allows the agent to swap tokens using Jupiter, the best DEX aggregator on Solana |
| `@goat-sdk/plugin-spl-token` | Lets the agent send, receive, and check balances of SPL tokens (like USDC, BONK, etc.) |
| `@goat-sdk/plugin-pumpfun` | Lets the agent buy and sell tokens on Pump.fun |
| `@goat-sdk/adapter-langchain` | Converts GOAT tools into a format that LangChain agents can call |
| `@langchain/core` | Core building blocks for the LangChain AI framework |
| `@langchain/langgraph` | Runs the agent loop — decides when to think, when to call a tool, and when to reply |
| `@langchain/openai` | Connects LangChain to OpenAI so GPT-4o can power the agent's reasoning |
| `@solana/web3.js` | The standard library for talking to the Solana blockchain (sending RPC requests, building transactions) |
| `bs58` | Decodes your base58-encoded Solana private key into a format the code can use |
| `dotenv` | Loads your `.env` file so secrets like API keys are not hardcoded in the source |

## Security

- Store private keys in `.env` only — never commit this file.
- Use a dedicated burner wallet with minimal funds for testing.
- On mainnet, double-check all transactions before confirming.
