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

if (!host || !token) {
  console.error('Set GETBLOCK_TRON_GRPC_HOST and GETBLOCK_TOKEN in .env');
  process.exit(1);
}

const packageDefinition = protoLoader.loadSync(resolve(PROTO_DIR, 'API.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [PROTO_ROOT],
});
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.protocol.Wallet(host, grpc.credentials.createSsl());

const getNowBlock = proto.protocol.Wallet.service.GetNowBlock;
const methodPath = `/${token}${getNowBlock.path}`;

function fetchNowBlock() {
  return new Promise((res, rej) => {
    const deadline = new Date(Date.now() + 15000);
    client.makeUnaryRequest(
      methodPath,
      getNowBlock.requestSerialize,
      getNowBlock.responseDeserialize,
      {},
      new grpc.Metadata(),
      { deadline },
      (err, block) => (err ? rej(err) : res(block)),
    );
  });
}

let lastSeen = null;

async function tick() {
  try {
    const block = await fetchNowBlock();
    const raw = block?.block_header?.raw_data ?? {};
    const number = raw.number ?? '?';
    if (number !== lastSeen) {
      lastSeen = number;
      const txs = block?.transactions?.length ?? 0;
      const when = raw.timestamp ? new Date(Number(raw.timestamp)).toISOString() : 'n/a';
      console.log(`Block #${number} | ${txs} txs | ${when}`);
    }
  } catch (err) {
    console.error('Poll error:', err.code ? `${err.code} ${err.details}` : err.message);
  }
}

await tick();
const timer = setInterval(tick, pollMs);

process.on('SIGINT', () => {
  clearInterval(timer);
  client.close();
  process.exit(0);
});
