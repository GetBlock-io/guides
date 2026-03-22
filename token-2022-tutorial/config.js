import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";

import 'dotenv/config'

// Replace with your GetBlock endpoint
const GETBLOCK_RPC_URL = process.env.RPC_URL;

// Create connection to Solana via GetBlock
const connection = new Connection(GETBLOCK_RPC_URL, "confirmed");

// Load keypair from private key in .env 
const payer = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY));


export { connection, payer};
