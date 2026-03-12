# 🚀 Solana Transaction Optimization Guide

**Land your transactions faster on Solana with these three proven methods.**

This guide covers the most effective ways to optimize transaction landing on Solana:

1. **bloXroute Trader API** - Enterprise-grade transaction propagation
2. **Merkle Private Pool** - MEV protection + Solana Boost
3. **Priority Fees** - Native Solana fee bidding

---

## 📊 Quick Comparison

| Method | Speed Improvement | MEV Protection | Cost | Best For |
|--------|------------------|----------------|------|----------|
| **bloXroute** | 382ms faster | ✅ Yes (Jito bundles) | Tip + Priority Fee | High-frequency trading |
| **Merkle** | Better than Jito | ✅ Yes (SWQoS) | 0.001 SOL min tip | DeFi apps, wallets |
| **Priority Fees** | Variable | ❌ No | 0.00001-0.01 SOL | General use |

---

## 🔧 Installation

```bash
npm install @solana/web3.js bs58
```

For TypeScript:
```bash
npm install -D typescript ts-node @types/node
```

---

## 1️⃣ bloXroute Trader API

**What it does:** Routes your transaction through bloXroute's Blockchain Distribution Network (BDN) with ultra-low latency connections to Solana validators.

### Setup

1. Create account at [bloxroute.com](https://bloxroute.com)
2. Get your `AUTH_HEADER` from the BDN portal
3. Set environment variable:
```bash
export BLOXROUTE_AUTH_HEADER="your-auth-header"
```

### Key Features

- **Staked RPCs (SWQoS)**: Direct leader routing via staked validator connections
- **Front-running Protection**: Jito bundle submission prevents MEV attacks
- **Fast Best Effort**: Balance between speed and MEV protection

### Code Example

```typescript
import { submitViaBloxroute, createBloxrouteTipInstruction } from './index';

// Add bloXroute tip (required for SWQoS)
const tipInstruction = createBloxrouteTipInstruction(
  wallet.publicKey,
  10000 // lamports
);

// Submit with all optimizations
const signature = await submitViaBloxroute(serializedTx, {
  frontRunningProtection: true,
  useStakedRPCs: true,
  fastBestEffort: true,
});
```

### bloXroute Tip Wallet
```
HWEoBxYs7ssKuudEjzjmpfJVX7Dvi7wescFsVx2L5yoY
```

---

## 2️⃣ Merkle Private Pool

**What it does:** Sends transactions through Merkle's private mempool with direct validator connections via Stake-weighted Quality of Service.

### Setup

1. Create account at [merkle.io](https://merkle.io)
2. Get your API key from the dashboard
3. Your RPC endpoint: `https://svm.merkle.io/<api-key>`

### Solana Boost

To enable transaction boost, include a transfer of **minimum 0.001 SOL** to the Merkle tip account:

```typescript
const tipInstruction = SystemProgram.transfer({
  fromPubkey: wallet.publicKey,
  toPubkey: new PublicKey('mkLkJUvg6yNULmMvEHW4rQvoTGNZWLSeYdMswPMNpVD'),
  lamports: 1_000_000, // 0.001 SOL minimum
});
```

### Code Example

```typescript
import { submitViaMerkle, createMerkleTipInstruction } from './index';

// Build transaction with Merkle tip
transaction.add(createMerkleTipInstruction(wallet.publicKey));

// Submit via Merkle RPC
const signature = await submitViaMerkle(serializedTx);

// Verify boost status
const wasBoosted = await checkMerkleBoostStatus(signature);
```

### Merkle Tip Wallet
```
mkLkJUvg6yNULmMvEHW4rQvoTGNZWLSeYdMswPMNpVD
```

---

## 3️⃣ Priority Fees (Native Solana)

**What it does:** Uses Solana's built-in priority fee mechanism to bid for higher scheduling priority.

### How Priority Fees Work

```
Priority Fee = Compute Units × Price per CU (microLamports)
```

Key points:
- Fees are charged based on **requested** CU, not actual usage
- Always optimize compute unit limit to avoid overpaying
- Higher priority = better chance of landing first

### Code Example

```typescript
import { ComputeBudgetProgram } from '@solana/web3.js';

// Step 1: Estimate compute units via simulation
const estimatedCU = await estimateComputeUnits(connection, transaction);

// Step 2: Get recent priority fees
const fees = await getRecentPriorityFees(connection);

// Step 3: Add compute budget instructions FIRST
transaction.add(
  ComputeBudgetProgram.setComputeUnitLimit({ units: estimatedCU }),
  ComputeBudgetProgram.setComputeUnitPrice({ microLamports: fees.high })
);

// Step 4: Add your main instructions
transaction.add(transferInstruction);
```

### Priority Fee Levels

| Level | microLamports/CU | Use Case |
|-------|------------------|----------|
| Low | 1,000 - 5,000 | Non-urgent transfers |
| Medium | 10,000 - 25,000 | Normal DeFi operations |
| High | 50,000 - 100,000 | Time-sensitive trades |
| Extreme | 100,000+ | Critical/competitive transactions |

---

## 🎯 Best Practices

### Transaction Structure

```
1. Compute Budget Instructions (FIRST)
   - SetComputeUnitLimit
   - SetComputeUnitPrice

2. Main Instructions
   - Your transfer/swap/etc

3. Tip Instruction (LAST)
   - bloXroute or Merkle tip
```

### Compute Unit Optimization

```typescript
// Always simulate first
const simulation = await connection.simulateTransaction(tx);
const actualCU = simulation.value.unitsConsumed;

// Add 10% buffer
const optimizedCU = Math.ceil(actualCU * 1.1);
```

### Error Handling

```typescript
// Retry with exponential backoff
async function submitWithRetry(tx, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await submitTransaction(tx);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

---

## 🔄 Combined Approach (Maximum Landing Rate)

For critical transactions, combine all methods:

```typescript
// 1. High priority fee
transaction.add(
  ComputeBudgetProgram.setComputeUnitLimit({ units: 150_000 }),
  ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 })
);

// 2. Main instruction
transaction.add(transferInstruction);

// 3. bloXroute tip for propagation
transaction.add(createBloxrouteTipInstruction(wallet.publicKey, 10_000));

// 4. Submit via bloXroute with all flags
await submitViaBloxroute(serializedTx, {
  frontRunningProtection: true,
  useStakedRPCs: true,
  fastBestEffort: true,
});
```

---

## 📈 Performance Benchmarks

Based on bloXroute's published benchmarks (March 2025):

| Configuration | Landing Rate | Avg Latency |
|--------------|--------------|-------------|
| Public RPC only | ~45% | Variable |
| Public RPC + Priority Fee | ~65% | Variable |
| bloXroute SWQoS | ~85% | 3.6s (p90) |
| bloXroute + FR Protection | **~98%** | 3.2s (p90) |

---

## 🛠️ Environment Variables

```bash
# Required for bloXroute
export BLOXROUTE_AUTH_HEADER="your-auth-header"

# Required for Merkle
export MERKLE_API_KEY="your-api-key"

# Your Solana wallet
export SOLANA_PRIVATE_KEY="your-base58-private-key"

# Optional: Custom RPC
export SOLANA_RPC="https://your-rpc-endpoint.com"
```

---

## 📚 Resources

### Documentation
- [bloXroute Trader API Docs](https://docs.bloxroute.com/solana/trader-api)
- [Merkle Solana Docs](https://docs.merkle.io/private-pool/wallets/solana-boost)
- [Solana Priority Fees Guide](https://solana.com/docs/core/fees)

### SDKs
- [bloXroute TypeScript SDK](https://github.com/bloXroute-Labs/solana-trader-client-ts)
- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)

---

## 📄 License

MIT License - GetBlock DevRel Team
