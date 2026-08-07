# Submit a two-transaction BSC bundle through a bloXroute proxy

A small Go CLI that signs two sequential BNB self-transfers and submits them as
one private bundle with bloXroute's `blxr_submit_bundle` method.

The BSC node is used only to read chain state and fee suggestions. Transactions
are sent exclusively to the configured WebSocket proxy and are never broadcast
through the node RPC URL.

> [!WARNING]
> This script creates live BSC Mainnet transactions that spend BNB on gas. Use a
> dedicated test wallet with only the funds needed for the example. Never commit
> `.env` or use the recovery phrase for a valuable wallet.

## What it demonstrates

- BIP-44 account derivation at `m/44'/60'/0'/0/0` from a BIP-39 phrase.
- Two EIP-1559 BNB self-transfers with sequential pending nonces.
- Raw transaction encoding without the `0x` prefix required by bloXroute.
- Submission to all configured builders with `"mev_builders": {"all": ""}`.
- A confirmation prompt before any live submission.
- Validation that the node is BSC Mainnet (`chain_id = 56`).
- Refusal to build on top of unrelated pending wallet transactions.

## Prerequisites

- Go 1.25 or newer.
- A BSC Mainnet RPC endpoint.
- A WebSocket proxy that authenticates to bloXroute upstream and forwards the
  JSON-RPC request and response unchanged.
- A dedicated BSC wallet funded with enough BNB for two transfers and gas.

The proxy is responsible for bloXroute authentication. This CLI deliberately
does not send an `Authorization` header. Do not use bloXroute's direct Cloud API
URL unless your proxy or environment provides the required authentication.

## Configure

Copy the example file and replace its placeholder values:

```bash
cp .env.example .env
```

```dotenv
SEED_PHRASE="word1 word2 ... word12"
RPC_URL="https://your-bsc-node.example"
BLOXROUTE_WS_URL="wss://your-bloxroute-proxy.example/ws"

# Optional: amount sent back to the same wallet by each transaction.
# Default: 100000000 wei, or 0.0000000001 BNB.
AMOUNT_WEI="100000000"
```

The two configured URLs have separate responsibilities:

- `RPC_URL` reads the chain ID, pending nonce, balance, and fee suggestions.
- `BLOXROUTE_WS_URL` receives the private bundle through your bloXroute proxy.

## Run

```bash
go run .
```

The CLI prints the derived address, both nonces and transaction hashes, transfer
value, balance, fee caps, and maximum possible bundle fee. Review the output and
enter `y` or `yes` to submit. Do not use the wallet from another process while
the CLI is running; the nonce is checked again immediately before submission.

## Bundle mechanics and fees

bloXroute scores a BSC bundle approximately as follows:

```text
Bundle score = (private transaction gas fees × 0.9) + dynamic fee payment
```

Private transactions must collectively satisfy:

```text
(gas fees + dynamic fee payment) / gas used >= 0.05 gwei
```

This example does not pay the optional bloXroute dynamic-fee contract. Instead,
it applies a conservative `0.05 gwei` minimum priority-fee cap, so the private
transactions satisfy the minimum even with a zero base fee. Normal node fee
suggestions are usually higher. Paying the dynamic-fee contract is useful for
competitive prioritization but is not required when transaction gas fees meet
the minimum.

See bloXroute's official [Bundle Mechanics & Fees](https://docs.bloxroute.com/bsc/submit-bundles/bundle-mechanics-and-fees)
and [Bundle Submission](https://docs.bloxroute.com/bsc/submit-bundles/bsc-bundle-submission)
documentation for the current protocol rules.

## Successful submission example

All addresses, hashes, nonces, balances, and block numbers below are mock data.

```text
=== BSC bloXroute Bundle Summary ===
Address:            0x1111111111111111111111111111111111111111
Chain ID:           56
Transactions:       2
Nonces:             100, 101
Balance:            0.010000000000000000 BNB
Self-send per tx:   0.000000000100000000 BNB (100000000 wei)
Gas limit per tx:   50000
Gas tip cap:        1.00 gwei
Gas fee cap:        2.00 gwei
Max bundle gas fee: 0.000200000000000000 BNB
Tx 1 hash:          0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
Tx 2 hash:          0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
====================================

Submit both transactions as one live bundle? (y/yes): y

bloXroute response:
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "bundleHash": "0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
  },
  "error": null
}
```

A returned `bundleHash` confirms that bloXroute accepted the submission; it does
not guarantee block inclusion. Verify both transaction hashes on-chain.

If included, an explorer shows two separate transactions rather than one merged
transaction. A bundle is an off-chain submission envelope, while BSC records
each signed transaction independently. Both transactions should appear in the
same block with sequential nonces and the intended order.

An explorer may round the transfer value to `0 BNB` because
`0.0000000001 BNB` is below its display precision. A plain BNB self-transfer
normally consumes 21,000 gas even though this example sets a 50,000 gas limit;
the unused gas is not charged.

## Safety behavior

The CLI rejects:

- an invalid BIP-39 mnemonic;
- a node that is not BSC Mainnet;
- an insufficient wallet balance;
- a wallet with an existing pending transaction or a nonce that changes before
  submission;
- a proxy URL that does not use `ws://` or `wss://`;
- a submission containing anything other than exactly two transactions.

The `.env` file is ignored by Git. The repository's root
[MIT license](../LICENSE) applies to this guide.
