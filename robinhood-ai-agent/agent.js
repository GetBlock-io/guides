// Step 3 — an AI agent that reads Robinhood Chain through GetBlock RPC.
// The agent answers natural-language questions by calling real JSON-RPC tools
// via OpenAI function calling.
// Run: npm run agent -- "What is the current state of Robinhood Chain?"
import "dotenv/config";
import OpenAI from "openai";
import { formatEther, formatGwei, formatUnits, parseAbi } from "viem";
import { publicClient } from "./chain.js";

const client = new OpenAI();
const MODEL = process.env.OPENAI_MODEL ?? "gpt-5.1";

const erc20Abi = parseAbi([
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
]);

// ---------- Tool schemas the model sees ----------

const tools = [
  {
    type: "function",
    function: {
      name: "get_chain_status",
      description:
        "Get the current state of Robinhood Chain: chain ID, latest block number, gas price, and base fee. " +
        "Call this when the user asks about the network, gas costs, or how the chain is doing right now.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "get_balance",
      description:
        "Get the native ETH balance of an address on Robinhood Chain. " +
        "Call this when the user asks how much ETH a wallet or contract holds.",
      parameters: {
        type: "object",
        properties: {
          address: { type: "string", description: "0x-prefixed EVM address" },
        },
        required: ["address"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_block",
      description:
        "Fetch a block by number (or the latest block if no number is given): timestamp, transaction count, " +
        "gas used, and transaction hashes. Call this when the user asks what happened in a block or about recent activity.",
      parameters: {
        type: "object",
        properties: {
          blockNumber: {
            type: "string",
            description: "Block number as a decimal string. Omit for the latest block.",
          },
        },
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_transaction",
      description:
        "Look up a transaction by hash: sender, recipient, value, gas, and confirmation status. " +
        "Call this when the user provides a transaction hash.",
      parameters: {
        type: "object",
        properties: {
          hash: { type: "string", description: "0x-prefixed transaction hash" },
        },
        required: ["hash"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_token_info",
      description:
        "Read an ERC-20 token contract on Robinhood Chain (including tokenized Stock Tokens): name, symbol, " +
        "decimals, total supply, and optionally a holder's balance. Call this when the user asks about a token " +
        "or a tokenized stock at a given contract address.",
      parameters: {
        type: "object",
        properties: {
          tokenAddress: { type: "string", description: "0x-prefixed token contract address" },
          holderAddress: {
            type: "string",
            description: "Optional 0x-prefixed address to check the token balance of",
          },
        },
        required: ["tokenAddress"],
        additionalProperties: false,
      },
    },
  },
];

// ---------- Tool implementations backed by GetBlock RPC ----------

const implementations = {
  async get_chain_status() {
    const [chainId, blockNumber, gasPrice, block] = await Promise.all([
      publicClient.getChainId(),
      publicClient.getBlockNumber(),
      publicClient.getGasPrice(),
      publicClient.getBlock(),
    ]);
    return {
      chainId,
      network: chainId === 4663 ? "mainnet" : chainId === 46630 ? "testnet" : "unknown",
      latestBlock: blockNumber.toString(),
      gasPriceGwei: formatGwei(gasPrice),
      baseFeeGwei: block.baseFeePerGas ? formatGwei(block.baseFeePerGas) : null,
      latestBlockTimestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
      txCountInLatestBlock: block.transactions.length,
    };
  },

  async get_balance({ address }) {
    const balance = await publicClient.getBalance({ address });
    return {
      address,
      balanceEth: formatEther(balance),
      balanceWei: balance.toString(),
      explorer: `https://robinhoodchain.blockscout.com/address/${address}`,
    };
  },

  async get_block({ blockNumber }) {
    const block = await publicClient.getBlock(
      blockNumber ? { blockNumber: BigInt(blockNumber) } : {}
    );
    return {
      number: block.number.toString(),
      timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
      txCount: block.transactions.length,
      gasUsed: block.gasUsed.toString(),
      baseFeeGwei: block.baseFeePerGas ? formatGwei(block.baseFeePerGas) : null,
      transactions: block.transactions.slice(0, 10),
      explorer: `https://robinhoodchain.blockscout.com/block/${block.number}`,
    };
  },

  async get_transaction({ hash }) {
    const [tx, receipt] = await Promise.all([
      publicClient.getTransaction({ hash }),
      publicClient.getTransactionReceipt({ hash }).catch(() => null),
    ]);
    return {
      hash,
      from: tx.from,
      to: tx.to,
      valueEth: formatEther(tx.value),
      blockNumber: tx.blockNumber?.toString() ?? "pending",
      status: receipt ? receipt.status : "pending",
      gasUsed: receipt?.gasUsed?.toString() ?? null,
      explorer: `https://robinhoodchain.blockscout.com/tx/${hash}`,
    };
  },

  async get_token_info({ tokenAddress, holderAddress }) {
    const contract = { address: tokenAddress, abi: erc20Abi };
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      publicClient.readContract({ ...contract, functionName: "name" }),
      publicClient.readContract({ ...contract, functionName: "symbol" }),
      publicClient.readContract({ ...contract, functionName: "decimals" }),
      publicClient.readContract({ ...contract, functionName: "totalSupply" }),
    ]);
    const result = {
      tokenAddress,
      name,
      symbol,
      decimals,
      totalSupply: formatUnits(totalSupply, decimals),
      explorer: `https://robinhoodchain.blockscout.com/token/${tokenAddress}`,
    };
    if (holderAddress) {
      const balance = await publicClient.readContract({
        ...contract,
        functionName: "balanceOf",
        args: [holderAddress],
      });
      result.holderAddress = holderAddress;
      result.holderBalance = formatUnits(balance, decimals);
    }
    return result;
  },
};

// ---------- The agentic loop ----------

const SYSTEM_PROMPT =
  "You are an onchain analyst agent for Robinhood Chain — Robinhood's Arbitrum-based Ethereum L2 for " +
  "tokenized stocks, real-world assets, and AI agents. You have read-only JSON-RPC access via GetBlock. " +
  "Use your tools to fetch live data before answering; never guess onchain values. Amounts from tools are " +
  "already human-readable (ETH, gwei, token units). Keep answers concise and include Blockscout explorer " +
  "links when they help the user verify.";

const question =
  process.argv.slice(2).join(" ") ||
  "Give me a status report on Robinhood Chain: latest block, gas price, and recent activity.";

console.log(`🤖 Question: ${question}\n`);

const messages = [
  { role: "system", content: SYSTEM_PROMPT },
  { role: "user", content: question },
];

const MAX_TURNS = 10;

for (let turn = 0; turn < MAX_TURNS; turn++) {
  const response = await client.chat.completions.create({
    model: MODEL,
    messages,
    tools,
  });

  const message = response.choices[0].message;
  messages.push(message);

  // No more tool calls — the model has its final answer
  if (!message.tool_calls?.length) {
    console.log(message.content);
    break;
  }

  // Execute every tool call and feed the results back
  for (const call of message.tool_calls) {
    const { name, arguments: rawArgs } = call.function;
    console.log(`  ⚙️  ${name}(${rawArgs})`);
    let result;
    try {
      result = await implementations[name](JSON.parse(rawArgs || "{}"));
    } catch (error) {
      result = { error: error.shortMessage ?? error.message };
    }
    messages.push({
      role: "tool",
      tool_call_id: call.id,
      content: JSON.stringify(result),
    });
  }
}
