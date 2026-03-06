import { Connection, Keypair } from "@solana/web3.js";
import { solana } from "@goat-sdk/wallet-solana";
import { jupiter } from "@goat-sdk/plugin-jupiter";
import { splToken } from "@goat-sdk/plugin-spl-token";
import { getOnChainTools } from "@goat-sdk/adapter-langchain";
import { ChatOpenAI } from "@langchain/openai";
import { pumpfun } from "@goat-sdk/plugin-pumpfun";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import * as dotenv from "dotenv";
import bs58 from "bs58";
import * as readline from "readline";

dotenv.config();

async function initializeAgent() {
  // 1. Setup Solana Connection & Wallet
  const connection = new Connection(process.env.RPC_URL!, "confirmed");

  // GOAT likes standard Keypair or Secret Key strings
  const privateKey = process.env.SOLANA_PRIVATE_KEY!;
  const keypair = Keypair.fromSecretKey(bs58.decode(privateKey));

  // 2. Initialize GOAT Tools
  // This is the "magic" part that creates the tools for the AI
  const tools = await getOnChainTools({
    wallet: solana({
      keypair,
      connection,
    }),
    plugins: [
      splToken(),  
      pumpfun(),
      jupiter(), // Enables swapping via Jupiter
    ],
  });

  // 3. Initialize the LLM
  const llm = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0, // Lower temperature is better for tool calling
  });

  // 4. Create the Agent with Memory
  const memory = new MemorySaver();
  return createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
  });
}
async function run() {
  const agent = await initializeAgent();
  const config = { configurable: { thread_id: "goat-session-1" } };

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (prompt: string) => new Promise<string>((resolve) => rl.question(prompt, resolve));

  console.log('Solana AI Agent ready. Type "exit" to quit.\n');

  while (true) {
    const input = await ask("You: ");
    if (input.trim().toLowerCase() === "exit") {
      rl.close();
      break;
    }
    const response = await agent.invoke(
      { messages: [{ role: "user", content: input }] },
      config,
    );
    const lastMessage = response.messages[response.messages.length - 1];
    console.log("Agent:", lastMessage.content, "\n");
  }
}

run().catch(console.error);