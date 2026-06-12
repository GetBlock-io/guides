import { onboardWallet } from "./onboard.js";

const NEW_USER = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

const decision = await onboardWallet(NEW_USER, "eth");

if (!decision.allow) {
  console.log(`\n→ Onboarding BLOCKED: ${decision.reason}`);
} else {
  const track =
    decision.experience >= 7
      ? "pro"
      : decision.experience >= 3
        ? "intermediate"
        : "beginner";
  console.log(`\n→ Onboarding ALLOWED — show the "${track}" track`);
}
