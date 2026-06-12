import { vetToken } from "./vet.js";

const TOKEN = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // candidate token
await vetToken(TOKEN, "eth");
