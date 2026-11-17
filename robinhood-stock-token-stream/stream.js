import WebSocket from "ws";

const MAX_BACKOFF_MS = 30_000;
const MAX_TRACKED_EVENTS = 50_000;

/**
 * Opens a GetBlock EVM Data Stream connection, subscribes to every request in
 * `subscriptions`, and calls `onEvent(event, subscription)` once per new event.
 * Reconnects with exponential backoff and resubscribes after any disconnect.
 */
export function createStream({
  url,
  apiKey,
  subscriptions,
  onEvent,
  onStatus = console.log,
}) {
  const revisions = new Map(); // eventId -> greatest revision applied
  let ws;
  let attempt = 0;
  let closedByUser = false;

  function connect() {
    ws = new WebSocket(url, { headers: { Authorization: `Bearer ${apiKey}` } });
    const pending = new Map(); // request id -> subscription
    const active = new Map(); // subscription id -> subscription

    ws.on("open", () => {
      onStatus("Connected. Subscribing...");
      subscriptions.forEach((sub, i) => {
        const id = i + 1;
        pending.set(id, sub);
        ws.send(
          JSON.stringify({
            jsonrpc: "2.0",
            id,
            method: "getblock_subscribe",
            params: [{ topic: sub.topic, filters: sub.filters }],
          }),
        );
      });
    });

    ws.on("message", (raw) => {
      const msg = JSON.parse(raw);

      // Replies to our subscribe requests carry the request id
      if (msg.id !== undefined) {
        const sub = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) {
          onStatus(
            `Subscribe failed for ${sub?.label}: ${msg.error.code} ${msg.error.message}`,
          );
          return;
        }
        active.set(msg.result, sub);
        attempt = 0; // a working subscription resets the backoff
        onStatus(`Subscribed to ${sub.label} (${msg.result})`);
        return;
      }

      // Everything else is an event notification
      const { subscription, result: event } = msg.params;
      if (!isNewer(event)) return; // duplicate or stale revision
      onEvent(event, active.get(subscription));
    });

    ws.on("close", (code, reason) => {
      if (closedByUser) return;
      const delay = Math.min(1000 * 2 ** attempt, MAX_BACKOFF_MS);
      attempt += 1;
      const hint =
        code === 1006
          ? " (handshake rejected or network drop: check the API key)"
          : "";
      onStatus(
        `Disconnected (${code}${reason.length ? ` ${reason}` : ""})${hint}. Reconnecting in ${delay / 1000}s...`,
      );
      setTimeout(connect, delay);
    });

    ws.on("error", (err) => onStatus(`Socket error: ${err.message}`));
  }

  // Delivery is at-least-once: keep only the greatest revision per eventId
  function isNewer({ eventId, revision }) {
    const previous = revisions.get(eventId);
    if (previous !== undefined && revision <= previous) return false;
    revisions.delete(eventId);
    revisions.set(eventId, revision);
    if (revisions.size > MAX_TRACKED_EVENTS) {
      revisions.delete(revisions.keys().next().value); // forget the oldest
    }
    return true;
  }

  connect();

  return {
    close() {
      closedByUser = true;
      ws.close();
    },
  };
}
