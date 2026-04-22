import { Keypair, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

import { TOKEN_2022_PROGRAM_ID, ExtensionType, createInitializeMintInstruction, createInitializeMetadataPointerInstruction, getMintLen, TYPE_SIZE, LENGTH_SIZE } from "@solana/spl-token";

import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";

import { connection, payer } from "./config.js";

async function createTokenWithMetadata() {
  console.log("=== Creating Token with Metadata Extension ===\n");

  console.log("Payer address:", payer.publicKey.toBase58());

  // Step 1: Generate a new keypair for the mint account
  const mintKeypair = Keypair.generate();
  const mint = mintKeypair.publicKey;
  console.log("\nMint address:", mint.toBase58());

  // Step 3: Define token metadata
  const metadata = {
    updateAuthority: payer.publicKey,
    mint: mint,
    name: "GBT Token Tutorial",
    symbol: "GBT",
    uri: "https://getblock.io/",
    additionalMetadata: [["description", "A test token created with GetBlock"]],
  };

  // Step 4: Calculate space needed for mint account
  const decimals = 9;

  // Calculate space for mint with MetadataPointer extension
  const mintLen = getMintLen([ExtensionType.MetadataPointer]);

  // Calculate metadata space
  const metadataLen =
    TYPE_SIZE + // 2 bytes for type
    LENGTH_SIZE + // 2 bytes for length
    pack(metadata).length; // Actual metadata size

  // Step 5: Calculate rent
  // Lamports need to cover FULL size (mint + metadata)
  const lamports = await connection.getMinimumBalanceForRentExemption(
    mintLen + metadataLen,
  );

  // Step 6: Build the transaction
  const transaction = new Transaction().add(
    // Create the account
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint,
      space: mintLen, // ← Just the mint size
      lamports: lamports, // ← But funded for full size
      programId: TOKEN_2022_PROGRAM_ID,
    }),
    // Initialize the MetadataPointer extension
    // Points to the mint itself as the metadata account
    createInitializeMetadataPointerInstruction(
      mint, // mint
      payer.publicKey, // authority
      mint, // metadata address (pointing to itself)
      TOKEN_2022_PROGRAM_ID,
    ),

    // Initialize the mint
    createInitializeMintInstruction(
      mint, // mint
      decimals, // decimals
      payer.publicKey, // mint authority
      null, // freeze authority (optional)
      TOKEN_2022_PROGRAM_ID,
    ),

    // Initialize the metadata
    createInitializeInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      mint: mint,
      metadata: mint,
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadata.uri,
      mintAuthority: payer.publicKey,
      updateAuthority: payer.publicKey,
    }),
  );

  // Step 7: Send the transaction
  console.log("\nSending transaction...");

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [payer, mintKeypair], // Signers
    { commitment: "confirmed" },
  );

  console.log("\n✅ Token created successfully!");
  console.log("Transaction signature:", signature);
  console.log("Mint address:", mint.toBase58());
  console.log("\nToken details:");
  console.log("  Name:", metadata.name);
  console.log("  Symbol:", metadata.symbol);
  console.log("  Decimals:", decimals);
  console.log("  URI:", metadata.uri);

  return mint;
}

// Run the script
createTokenWithMetadata()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
