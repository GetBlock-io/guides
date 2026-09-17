import 'dotenv/config';

const STREAM_URL =
  `wss://stream.eu-central-1.getblock.io/v1/solana-mainnet/stream?apiKey=${process.env.GETBLOCK_API_KEY}`;

// One socket carrying several subscriptions. Every subscription is remembered,
// so the full set can be replayed after the connection drops.
export function createStream() {
  const subscriptions = [];
  let retries = 0;
  let byRequestId;
  let bySubscriptionId;

  function connect() {
    byRequestId = new Map();
    bySubscriptionId = new Map();
    const ws = new WebSocket(STREAM_URL);

    ws.onopen = () => {
      retries = 0;
      subscriptions.forEach((sub, i) => {
        byRequestId.set(i + 1, sub);
        ws.send(JSON.stringify({
          jsonrpc: '2.0',
          id: i + 1,
          method: 'getblock_subscribe',
          params: [sub.request],
        }));
      });
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.error) {
        console.error(`Subscription ${msg.id} rejected: ${msg.error.message}`);
        return;
      }

      // The acknowledgement pairs our request id with a subscription id.
      if (typeof msg.result === 'string') {
        bySubscriptionId.set(msg.result, { sub: byRequestId.get(msg.id), isSnapshot: true });
        return;
      }

      // Every notification names its subscription, so route on that.
      const entry = bySubscriptionId.get(msg.params?.subscription);
      if (!entry) return;
      entry.sub.onChange(msg.params.result, entry.isSnapshot);
      entry.isSnapshot = false;
    };

    // Reconnect fast: after a drop, only the last 100 trades can be recovered
    // from the backfill. Back off on repeated failures, such as a bad key.
    ws.onclose = (event) => {
      const delay = Math.min(1000 * 2 ** retries++, 30000);
      console.error(`Stream closed (code ${event.code}). Reconnecting in ${delay / 1000}s…`);
      setTimeout(connect, delay);
    };

    return ws;
  }

  return {
    subscribe(request, onChange) {
      subscriptions.push({ request, onChange });
    },
    connect,
  };
}
