# Build an AI Agent on Robinhood Chain with GetBlock RPC

Robinhood Chain is Robinhood's Ethereum Layer 2 — an Arbitrum-based rollup built for tokenized stocks, real-world assets (RWAs), and **AI agents**. It launched its public mainnet on July 1, 2026 with ~100ms block times, and Robinhood explicitly positions it as infrastructure where "AI agents can trade, swap, lend, and transact with tokenized real-world assets onchain." Within weeks of launch, thousands of AI agents were already deployed on the chain.

In this tutorial, you'll build exactly that: an **AI agent that reads Robinhood Chain in real time through GetBlock RPC**. Using OpenAI function calling, you'll give the model a set of onchain tools — balances, blocks, transactions, and ERC-20 (Stock Token) reads — and it will answer natural-language questions like *"analyze this wallet"* or *"what's happening on the chain right now?"* by making live JSON-RPC calls.

## What you'll build

1. **`quickstart.js`** — verify your GetBlock endpoint is connected to Robinhood Chain
2. **`watch-blocks.js`** — stream new blocks over WebSocket to see the ~100ms block cadence
3. **`agent.js`** — an OpenAI-powered agent that answers questions using live RPC data

## Prerequisites

- **Node.js 18+**
- **A GetBlock account** — sign up free at [getblock.io](https://getblock.io)
- **An OpenAI API key** — from [platform.openai.com](https://platform.openai.com) (only needed for the agent step)
- Basic JavaScript knowledge

## Chain facts you'll need

| Fact | Mainnet | Testnet |
| --- | --- | --- |
| Chain ID | `4663` | `46630` |
| Gas token | ETH | ETH |
| Explorer | [robinhoodchain.blockscout.com](https://robinhoodchain.blockscout.com) | explorer.testnet.chain.robinhood.com |
| Stack | Arbitrum Nitro rollup, Ethereum DA via blobs | same |

## Step 1 — Get your Robinhood Chain RPC endpoint from GetBlock

1. Log in to your [GetBlock dashboard](https://account.getblock.io)
2. Click **Get an endpoint** and select **Robinhood Chain**
3. Choose the network (mainnet) and copy your **JSON-RPC (HTTP)** endpoint — and the **WebSocket** endpoint if you want live block streaming

GetBlock exposes the full standard Ethereum JSON-RPC surface for Robinhood Chain (inherited from Arbitrum Nitro), plus Arbitrum-specific methods like `arb_getL1Confirmations` for tracking L1 settlement.

## Step 2 — Set up the project

```bash
mkdir robinhood-ai-agent && cd robinhood-ai-agent
npm init -y
npm install viem dotenv openai
```

Create a `.env` file:

```bash
GETBLOCK_RPC_URL=https://go.getblock.io/<YOUR_ACCESS_TOKEN>/
GETBLOCK_WS_URL=wss://go.getblock.io/<YOUR_ACCESS_TOKEN>/
OPENAI_API_KEY=sk-...
```

> Use the exact URLs shown in your GetBlock dashboard — the paths include your personal access token, which is how GetBlock authenticates you (no headers needed).

## Step 3 — Define the chain and connect ([chain.js](chain.js))

Robinhood Chain isn't bundled in viem yet, so we define it ourselves with `defineChain` and point the transport at GetBlock:

```js
export const robinhoodChain = defineChain({
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: [RPC_URL], webSocket: [WS_URL] } },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://robinhoodchain.blockscout.com" },
  },
});

export const publicClient = createPublicClient({
  chain: robinhoodChain,
  transport: http(RPC_URL),
});
```

Verify the connection:

```bash
npm run quickstart
```

Expected output:

```text
✅ Connected to Robinhood Chain via GetBlock

Chain ID:      4663 (mainnet)
Latest block:  #18452031
Gas price:     0.01 gwei
...
```

If the chain ID prints `4663`, your GetBlock endpoint is live.

## Step 4 — Watch blocks in real time ([watch-blocks.js](watch-blocks.js))

Robinhood Chain targets ~100ms blocks. GetBlock's WebSocket endpoint lets you subscribe to new heads with `eth_subscribe` — viem wraps this in `watchBlocks`:

```bash
npm run watch
```

```text
👀 Watching Robinhood Chain blocks (Ctrl+C to stop)...

#18452031  txs:   4  gasUsed: 312044  Δ —
#18452032  txs:   1  gasUsed: 96110   Δ +0s
#18452033  txs:   7  gasUsed: 501822  Δ +0s
```

Note the `Δ +0s` — multiple blocks land within the same second. That speed is exactly why the chain works for agent-driven trading: an AI agent gets near-instant confirmation feedback.

## Step 5 — Build the AI agent ([agent.js](agent.js))

This is the core of the tutorial. The pattern is **function calling**: you describe functions to the model, it decides when to call them, your code executes the real RPC calls against GetBlock, and the model reasons over the results.

Each tool is described with a JSON schema:

```js
{
  type: "function",
  function: {
    name: "get_balance",
    description:
      "Get the native ETH balance of an address on Robinhood Chain. " +
      "Call this when the user asks how much ETH a wallet or contract holds.",
    parameters: {
      type: "object",
      properties: { address: { type: "string", description: "0x-prefixed EVM address" } },
      required: ["address"],
    },
  },
}
```

…and backed by a real implementation that hits your GetBlock endpoint:

```js
async get_balance({ address }) {
  const balance = await publicClient.getBalance({ address });
  return { address, balanceEth: formatEther(balance) };
}
```

The **agentic loop** ties it together: call the model, execute any tool calls it requests, append the results as `tool` messages, and repeat until the model answers in plain text:

```js
for (let turn = 0; turn < MAX_TURNS; turn++) {
  const response = await client.chat.completions.create({ model: MODEL, messages, tools });
  const message = response.choices[0].message;
  messages.push(message);

  if (!message.tool_calls?.length) {
    console.log(message.content); // final answer
    break;
  }

  for (const call of message.tool_calls) {
    const result = await implementations[call.function.name](
      JSON.parse(call.function.arguments || "{}")
    );
    messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(result) });
  }
}
```

The agent gets five read-only tools, all backed by your GetBlock endpoint:

| Tool | RPC methods behind it | The agent uses it when... |
| --- | --- | --- |
| `get_chain_status` | `eth_chainId`, `eth_blockNumber`, `eth_gasPrice`, `eth_getBlockByNumber` | asked about the network or gas |
| `get_balance` | `eth_getBalance` | asked what a wallet holds |
| `get_block` | `eth_getBlockByNumber` | asked about recent activity |
| `get_transaction` | `eth_getTransactionByHash`, `eth_getTransactionReceipt` | given a tx hash |
| `get_token_info` | `eth_call` (ERC-20 reads) | asked about a token / Stock Token |

Two details worth copying into your own agents:

- **Prescriptive tool descriptions.** Each description says *when* to call the tool, not just what it does. This measurably improves the model's tool selection.
- **Human-readable tool results.** The tools return formatted values (`balanceEth`, `gasPriceGwei`) rather than raw wei — the model makes fewer unit mistakes and the answers read better.

## Step 6 — Talk to your agent

```bash
npm run agent -- "What's the current gas price and latest block on Robinhood Chain?"
```

```text
🤖 Question: What's the current gas price and latest block on Robinhood Chain?

Robinhood Chain (mainnet, chain ID 4663) is at block #18,452,940. Gas is
currently 0.01 gwei — effectively free for reads and cheap for agent-driven
trades. The latest block landed at 14:32:07 UTC with 3 transactions.
```

Try more:

```bash
npm run agent -- "Analyze wallet 0x... — how much ETH does it hold?"
npm run agent -- "What happened in block 18450000?"
npm run agent -- "Tell me about the token at 0x... and my balance in it"
```

Behind the scenes, the model chains tool calls on its own — a wallet-analysis question typically triggers `get_balance`, then `get_chain_status` for context, before it writes the answer. The `⚙️` lines the script prints show each call as it happens.

## Where to go next

- **Give the agent a wallet.** Add viem's `createWalletClient` with a funded testnet key (chain ID `46630`) and a `send_transaction` tool — now the agent can act, not just observe. Gate writes behind human confirmation.
- **Track Stock Token transfers.** Add a tool over `eth_getLogs` filtering ERC-20 `Transfer` events to let the agent monitor tokenized-equity flows.
- **Go multi-turn.** Wrap the tool runner in a readline loop, appending each exchange to `messages`, for a conversational onchain copilot.
- **Scale up.** GetBlock's shared nodes are free to start; dedicated nodes give you unmetered throughput for production agents.

## Conclusion

Robinhood Chain was built with AI agents as first-class users, and GetBlock gives you the reliable RPC layer those agents need. In ~200 lines of JavaScript you connected to the chain, streamed 100ms blocks over WebSocket, and shipped an AI agent that reasons over live onchain data.

**Get your free Robinhood Chain endpoint at [account.getblock.io](https://account.getblock.io/).**
