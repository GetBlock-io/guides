import Client from "@triton-one/yellowstone-grpc";
import { CommitmentLevel } from "@triton-one/yellowstone-grpc";
import bs58 from "bs58";
import { config } from "dotenv";

// Load environment variables from .env
config();

const ENDPOINT = "https://go.getblock.io"; 
const TOKEN = process.env.GETBLOCK_TOKEN; 

const TARGET_POOL = "8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj"; // SOL/USDC CLMM
const POOL_NAME = "SOL/USDC";
const RAYDIUM_AMM = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";
const RAYDIUM_CLMM = "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK";
const JUPITER_V6 = "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";

let stats = {
  startTime: Date.now(),
  totalSwaps: 0,
};

function identifySwapSource(instructions, accountKeys) {
  for (const instruction of instructions) {
    const programIdx = instruction.programIdIndex;
    const programId = bs58.encode(accountKeys[programIdx]);

    if (programId === JUPITER_V6) {
      return "Jupiter";
    } else if (programId === RAYDIUM_CLMM) {
      return "Raydium CLMM";
    } else if (programId === RAYDIUM_AMM) {
      return "Raydium AMM";
    }
  }

  return "Other";
}


function displaySwap(swapData) {
  stats.totalSwaps++;

  console.log("\n" + "=".repeat(80));
  console.log(`✅ SWAP #${stats.totalSwaps} on ${POOL_NAME}`);
  console.log("=".repeat(80));

  console.log(`\n🔀 SOURCE:      ${swapData.source}`);
  console.log(`👤 TRADER:      ${swapData.trader}`);
  console.log(`📜 SIGNATURE:   ${swapData.signature}`);
  console.log(`🎰 SLOT:        ${swapData.slot}`);
  console.log(`⏰ TIME:        ${swapData.time}`);

  console.log(`\n🔍 EXPLORE:`);
  console.log(`   TX:   https://solscan.io/tx/${swapData.signature}`);
  console.log(`   Pool: https://solscan.io/account/${TARGET_POOL}`);

  console.log("\n" + "=".repeat(80) + "\n");
}

async function monitorPoolSwaps() {
  console.log("🚀 Starting Liquidity Pool Swap Monitor");
  console.log(`🎯 Pool: ${POOL_NAME}`);
  console.log(`📍 Address: ${TARGET_POOL}\n`);
  console.log("Waiting for swaps...\n");

  return new Promise(async (resolve, reject) => {
    try {
      const client = new Client(ENDPOINT, TOKEN, undefined);
      const stream = await client.subscribe();
      const request = {
        accounts: {},
        slots: {},
        transactions: {
          pool_swaps: {
            accountInclude: [TARGET_POOL],
            accountExclude: [],
            accountRequired: [],
          },
        },
        transactionsStatus: {},
        entry: {},
        blocks: {},
        blocksMeta: {},
        commitment: CommitmentLevel.CONFIRMED,
        accountsDataSlice: [],
        ping: undefined,
      };
      stream.on("data", (message) => {
        try {
          if (message.pong) {
            stream.write({ ping: { id: message.pong.id } });
            return;
          }

          if (
            message.transaction &&
            message.filters &&
            message.filters.includes("pool_swaps")
          ) {
            const tx = message.transaction.transaction;
            const signature = bs58.encode(tx.signature);
            const slot = message.transaction.slot.toString();

            const txMessage = tx.transaction.message;
            const accountKeys = txMessage.accountKeys;
            const instructions = txMessage.instructions;
            const txMeta = message.transaction.meta;
            if (txMeta && txMeta.err) return;

            // Identify swap source
            const source = identifySwapSource(instructions, accountKeys);

            // Get trader (signer)
            const trader =
              accountKeys.length > 0
                ? bs58.encode(Buffer.from(accountKeys[0]))
                : "Unknown";

            displaySwap({
              source: source,
              trader: trader,
              signature: signature,
              slot: slot,
              time: new Date().toLocaleTimeString(),
            });
          }
        } catch (error) {
          console.error(`Error processing transaction: ${error.message}`);
        }
      });
      stream.on("error", (error) => {
        console.error(`Stream error: ${error.message}`);
        reject(error);
      });

      stream.on("end", () => resolve());
      stream.on("close", () => resolve());
      stream.write(request, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("✅ Subscription active - monitoring pool swaps...\n");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
async function main() {
  try {
    await monitorPoolSwaps();
  } catch (error) {
    console.error("Monitor crashed:", error.message);
    console.log("Restarting in 5 seconds...");
    setTimeout(main, 5000);
  }
}

process.on("SIGINT", () => {
  console.log("\n\n🛑 Shutting down...");
  console.log(`Total swaps detected: ${stats.totalSwaps}\n`);
  process.exit(0);
});

main();
