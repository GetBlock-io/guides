#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ethers } from "ethers";
import { z } from "zod";

// Validate environment
const GETBLOCK_TOKEN = process.env.GETBLOCK_TOKEN;

// Initialize Ethers provider with GetBlock
const provider = new ethers.JsonRpcProvider(
  `https://go.getblock.us/${GETBLOCK_TOKEN}/`
);

// Create MCP server with modern API
const server = new McpServer({
  name: "ethereum-mcp-server",
  version: "1.0.0",
});

console.error("✅ Ethereum MCP Server initialized");

// ============================================================================
// TOOL 1: Get ETH Balance
// ============================================================================

server.tool(
  "get_eth_balance",
  {
    address: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/)
      .describe("Ethereum address (0x followed by 40 hex characters)"),
  },
  async ({ address }) => {
    try {
      // Fetch balance from blockchain
      const balanceWei = await provider.getBalance(address);

      // Convert Wei to ETH
      const balanceEth = ethers.formatEther(balanceWei);

      // Return structured response
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                address: address,
                balance: balanceEth,
                unit: "ETH",
                balanceWei: balanceWei.toString(),
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error.message,
              address: address,
            }),
          },
        ],
        isError: true,
      };
    }
  }
);

// ============================================================================
// TOOL 2: Get Gas Price
// ============================================================================

server.tool("get_gas_price", {}, async () => {
  try {
    // Fetch current fee data
    const feeData = await provider.getFeeData();

    // Convert to Gwei
    const gasPriceGwei = ethers.formatUnits(feeData.gasPrice, "gwei");

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              gasPrice: gasPriceGwei,
              unit: "Gwei",
              gasPriceWei: feeData.gasPrice.toString(),
              maxFeePerGas: feeData.maxFeePerGas
                ? ethers.formatUnits(feeData.maxFeePerGas, "gwei")
                : null,
              maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
                ? ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei")
                : null,
            },
            null,
            2
          ),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ error: error.message }),
        },
      ],
      isError: true,
    };
  }
});

// ============================================================================
// TOOL 3: Get Block Number
// ============================================================================

server.tool("get_block_number", {}, async () => {
  try {
    // Fetch latest block number
    const blockNumber = await provider.getBlockNumber();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              blockNumber: blockNumber,
              timestamp: new Date().toISOString(),
              network: "Ethereum Mainnet",
            },
            null,
            2
          ),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ error: error.message }),
        },
      ],
      isError: true,
    };
  }
});

server.tool(
  "get_transaction_count",
  {
    address: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/)
      .describe("Ethereum address"),
  },
  async ({ address }) => {
    try {
      const txCount = await provider.getTransactionCount(address);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                address: address,
                transactionCount: txCount,
                description: "Number of transactions sent from this address",
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: JSON.stringify({ error: error.message }) },
        ],
        isError: true,
      };
    }
  }
);

server.resource("network-info", "eth://network/info", async (uri) => {
  const [blockNumber, gasPrice] = await Promise.all([
    provider.getBlockNumber(),
    provider.getFeeData(),
  ]);

  return {
    contents: [
      {
        uri: uri.href,
        mimeType: "application/json",
        text: JSON.stringify(
          {
            network: "Ethereum Mainnet",
            latestBlock: blockNumber,
            gasPrice: ethers.formatUnits(gasPrice.gasPrice, "gwei") + " Gwei",
            timestamp: new Date().toISOString(),
          },
          null,
          2
        ),
      },
    ],
  };
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

async function main() {
  try {
    // Create stdio transport for Claude Desktop
    const transport = new StdioServerTransport();

    // Connect server to transport
    await server.connect(transport);

    console.error("🚀 Ethereum MCP Server is running!");
    console.error("📡 Connected via stdio transport");
    console.error("⏳ Waiting for tool calls...");
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.error("\n👋 Shutting down...");
  process.exit(0);
});

// Start the server
main().catch((error) => {
  console.error("💥 Fatal error:", error);
  process.exit(1);
});
