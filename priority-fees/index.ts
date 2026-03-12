import {
  Connection,
  Keypair,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
  SystemProgram,
  PublicKey,
  ComputeBudgetProgram,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
} from "@solana/web3.js";
import "dotenv/config";
import bs58 from "bs58";

const SOLANA_RPC = process.env.GETBLOCK_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RECIPIENT_WALLET = process.env.RECIPIENT_WALLET;

if (!SOLANA_RPC || !PRIVATE_KEY || !RECIPIENT_WALLET) {
  throw new Error("Missing required environment variables: GETBLOCK_API_KEY, PRIVATE_KEY, or RECIPIENT_WALLET");
}

async function sendWithPriorityFee(
  wallet: Keypair,
  recipient: PublicKey,
  amountSol: number,
): Promise<string> {
  const connection = new Connection(SOLANA_RPC!);

  // 1. Create the transfer instruction
  const transferIx = SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: recipient,
    lamports: amountSol * LAMPORTS_PER_SOL,
  });

  // 2. Simulate to estimate compute units
  const { blockhash: simBlockhash } = await connection.getLatestBlockhash();
  const simMessage = new TransactionMessage({
    payerKey: wallet.publicKey,
    recentBlockhash: simBlockhash,
    instructions: [transferIx],
  }).compileToV0Message();
  const simTx = new VersionedTransaction(simMessage);

  const simulation = await connection.simulateTransaction(simTx);
  // Add 600 CU overhead to account for the two ComputeBudget instructions
  // (each ~150 CU), which are not included in the simulation
  const estimatedCU = Math.max(
    Math.ceil((simulation.value.unitsConsumed || 200_000) * 1.1) + 600,
    600,
  );

  console.log(`Estimated CU: ${estimatedCU}`);

  // 3. Get dynamic priority fee from network
  const recentFees = await connection.getRecentPrioritizationFees();
  const sortedFees = recentFees
    .map((f) => f.prioritizationFee)
    .filter((f) => f > 0)
    .sort((a, b) => a - b);

  const dynamicFee =
    sortedFees.length > 0
      ? sortedFees[Math.floor(sortedFees.length * 0.75)]
      : 10_000;

  console.log(`Priority fee: ${dynamicFee} microLamports/CU`);

  // 4. Calculate total cost
  const totalPriorityFee = Math.ceil((estimatedCU * dynamicFee) / 1_000_000);
  console.log(
    `Total priority fee: ${totalPriorityFee} lamports (${totalPriorityFee / LAMPORTS_PER_SOL} SOL)`,
  );

  // 5. Build final transaction
  const { blockhash } = await connection.getLatestBlockhash("confirmed");

  const finalTx = new Transaction();
  finalTx.add(ComputeBudgetProgram.setComputeUnitLimit({ units: estimatedCU }));
  finalTx.add(
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: dynamicFee }),
  );
  finalTx.add(transferIx);
  finalTx.recentBlockhash = blockhash;
  finalTx.feePayer = wallet.publicKey;

  // 6. Sign and send
  finalTx.sign(wallet);

  const signature = await sendAndConfirmTransaction(
    connection,
    finalTx,
    [wallet],
    { skipPreflight: false, preflightCommitment: "confirmed" },
  );

  console.log(
    `Transaction confirmed: https://solscan.io/tx/${signature}?cluster=devnet`,
  );
  return signature;
}

// Main entry point
const privateKeyBytes = bs58.decode(PRIVATE_KEY!);
const wallet = Keypair.fromSecretKey(privateKeyBytes);
const recipient = new PublicKey(RECIPIENT_WALLET!);
const amountSol = 0.001; // Amount in SOL to send

sendWithPriorityFee(wallet, recipient, amountSol).catch(console.error);
