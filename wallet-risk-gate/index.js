// index.js
import { shouldAllow } from "./gate.js";

const COUNTERPARTY = "0x34F279B06AD3A6A55379DD110bDdE64c71dC9879";

const decision = await shouldAllow(COUNTERPARTY, "eth");
console.log(decision.allow ? "→ Transaction ALLOWED" : "→ Transaction BLOCKED");
