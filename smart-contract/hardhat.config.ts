import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const RPC_URL = vars.has("RPC_URL") ? vars.get("RPC_URL") : "";
const PRIVATE_KEY = vars.has("PRIVATE_KEY")
  ? vars.get("PRIVATE_KEY")
  : "0x" + "0".repeat(64);

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  }
};

export default config;
