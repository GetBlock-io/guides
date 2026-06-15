# Stream the latest TRON block over GetBlock gRPC

You'll need:

- A GetBlock account
- A TRON Mainnet endpoint with **gRPC (Fullnode)** enabled (Shared Nodes → Create New Endpoint → Protocol: TRON, API Interface: gRPC (Fullnode))
- Node.js 18+

> Heads up: there is **no** `@tronprotocol/grpc-client` package on npm, and TRON's gRPC API has **no** block subscription stream. TRON's `Wallet` service is unary-only, so you poll `GetNowBlock`. GetBlock also requires TLS and authenticates by putting your token in the gRPC **method path** (not metadata).

## Setup (≈3 minutes)

```bash
mkdir tron-grpc-hello && cd tron-grpc-hello
npm init -y
npm pkg set type=module
npm install @grpc/grpc-js @grpc/proto-loader dotenv
```

Add the TRON protobuf definitions. Copy the java-tron protos into `proto/src/proto/`
so the layout matches the `import "src/proto/..."` lines inside them:

```
proto/
└── src/proto/
    ├── API.proto
    ├── Tron.proto
    ├── Discover.proto
    └── contract/   (account_contract.proto, smart_contract.proto, …)
```

(They live in the official `tronprotocol/protocol` repo, and a working copy is
already vendored in this folder.)

Create `.env`:

```bash
GETBLOCK_TRON_GRPC_HOST=shared.us-east-1.getblock.io:443
GETBLOCK_TOKEN=your_access_token_here
POLL_MS=3000
```

The host is a bare `host:port` — **no** `https://`, **no** trailing slash.

## Stream the latest block (≈5 minutes)

```js
// stream-blocks.mjs
import 'dotenv/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROTO_ROOT = resolve(__dirname, 'proto');
const PROTO_DIR = resolve(PROTO_ROOT, 'src/proto');

const host = process.env.GETBLOCK_TRON_GRPC_HOST;
const token = process.env.GETBLOCK_TOKEN;
const pollMs = Number(process.env.POLL_MS ?? 3000);

const pkgDef = protoLoader.loadSync(resolve(PROTO_DIR, 'API.proto'), {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true,
  includeDirs: [PROTO_ROOT],
});
const proto = grpc.loadPackageDefinition(pkgDef);

// TLS on port 443.
const client = new proto.protocol.Wallet(host, grpc.credentials.createSsl());

// GetBlock auth: token is a prefix on the gRPC method path.
const method = proto.protocol.Wallet.service.GetNowBlock;
const methodPath = `/${token}${method.path}`; // /<token>/protocol.Wallet/GetNowBlock

function fetchNowBlock() {
  return new Promise((res, rej) => {
    client.makeUnaryRequest(
      methodPath, method.requestSerialize, method.responseDeserialize,
      {}, new grpc.Metadata(), { deadline: new Date(Date.now() + 15000) },
      (err, block) => (err ? rej(err) : res(block)),
    );
  });
}

let lastSeen = null;
async function tick() {
  try {
    const block = await fetchNowBlock();
    const raw = block?.block_header?.raw_data ?? {};
    if (raw.number !== lastSeen) {
      lastSeen = raw.number;
      const txs = block?.transactions?.length ?? 0;
      console.log(`Block #${raw.number} | ${txs} txs | ${new Date(Number(raw.timestamp)).toISOString()}`);
    }
  } catch (err) {
    console.error('Poll error:', err.code ? `${err.code} ${err.details}` : err.message);
  }
}

await tick();
setInterval(tick, pollMs);
```

## Run it

```bash
node stream-blocks.mjs
```

You'll see a new line each time the chain advances:

```
Block #83619688 | 751 txs | 2026-06-15T13:00:06.000Z
Block #83619689 | 676 txs | 2026-06-15T13:00:09.000Z
```

Stop with `Ctrl+C`.
