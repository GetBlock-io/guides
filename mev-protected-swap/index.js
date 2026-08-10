import { Contract, JsonRpcProvider, Wallet, formatUnits, parseEther } from "ethers";
import "dotenv/config";

const CHAIN_ID = 56; // BSC mainnet
const ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // PancakeSwap V2
const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const USDT = "0x55d398326f99059fF775485246999027B3197955"; // 18 decimals on BSC

const ROUTER_ABI = [
  "function getAmountsOut(uint256 amountIn, address[] path) view returns (uint256[] amounts)",
  "function swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline) payable returns (uint256[])",
];

const ERC20_ABI = ["function balanceOf(address) view returns (uint256)"];

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  const value = i === -1 ? fallback : process.argv[i + 1];
  if (value === undefined) throw new Error(`Missing --${name}`);
  return value;
}

async function main() {
  for (const key of ["PRIVATE_KEY", "BSC_MEV_RPC"]) {
    if (!process.env[key]) throw new Error(`Missing ${key} - see .env.example`);
  }

  const amountIn = parseEther(arg("amount"));
  const slippage = Number(arg("slippage", "0.5"));

  // Every call and every transaction below goes through this one endpoint.
  // Because it has the MEV Protection add-on enabled, the swap is routed to a
  // private mempool instead of the public one - no bot sees it before it lands.
  const provider = new JsonRpcProvider(process.env.BSC_MEV_RPC, CHAIN_ID, {
    staticNetwork: true,
  });
  const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
  const router = new Contract(ROUTER, ROUTER_ABI, wallet);
  const usdt = new Contract(USDT, ERC20_ABI, provider);

  // BNB is the native coin, so the swap needs no token approval. The router
  // wraps it to WBNB internally, which is why the path starts there.
  const path = [WBNB, USDT];

  // Quote first, so you know what you are agreeing to before you sign.
  const amounts = await router.getAmountsOut(amountIn, path);
  const expectedOut = amounts[amounts.length - 1];

  // The floor you are willing to accept. This is a separate defence from MEV
  // Protection: the add-on stops a sandwich being possible at all, while this
  // caps your loss if the price simply moves while the swap is in flight.
  const minOut = (expectedOut * BigInt(Math.round((100 - slippage) * 100))) / 10000n;

  console.log(`Swap ${arg("amount")} BNB -> USDT`);
  console.log(`  expected      ${formatUnits(expectedOut, 18)} USDT`);
  console.log(`  min received  ${formatUnits(minOut, 18)} USDT (${slippage}% slippage)`);
  console.log(`  wallet        ${wallet.address}`);

  const before = await usdt.balanceOf(wallet.address);
  const deadline = Math.floor(Date.now() / 1000) + 300; // 5 minutes

  console.log("\nSending swap through the MEV-protected endpoint...");

  const swapArgs = [minOut, path, wallet.address, deadline];

  // eth_estimateGas returns the *minimum* gas that succeeds against the state
  // it saw. Pool reserves move between the estimate and inclusion, and a
  // private mempool can mean a longer wait, so sending the bare estimate
  // reverts the moment the swap needs one gas more than it did a second ago.
  // A 25% buffer costs nothing - unused gas is refunded.
  const estimate = await router.swapExactETHForTokens.estimateGas(...swapArgs, {
    value: amountIn,
  });

  const tx = await router.swapExactETHForTokens(...swapArgs, {
    value: amountIn,
    gasLimit: (estimate * 125n) / 100n,
  });

  console.log(`  tx ${tx.hash}`);
  const receipt = await tx.wait();
  console.log(`  mined in block ${receipt.blockNumber}`);

  const after = await usdt.balanceOf(wallet.address);
  console.log(`  received ${formatUnits(after - before, 18)} USDT`);
  console.log(`\nhttps://bscscan.com/tx/${tx.hash}`);

  provider.destroy();
}

main().catch((error) => {
  console.error(`\n${error.shortMessage ?? error.message}`);
  process.exit(1);
});
