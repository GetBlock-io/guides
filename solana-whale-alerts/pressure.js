export function watchPressure(stream, { base, quote, window = '5m' }) {
  const rows = new Map();

  stream.subscribe(
    {
      source: 'market',
      topic: 'volume',
      // hydrate: 1 keeps only the current window. When it rolls over, the new
      // window arrives in `inserts` and the finished one leaves in `deletes`.
      params: { base, quote, window, hydrate: 1, throttle: '1s' },
    },
    ({ inserts = [], updates = [], deletes = [] }) => {
      // One notification can carry several versions of the same row, oldest
      // first, so applying them in order leaves the latest in place.
      for (const row of [...inserts, ...updates]) rows.set(row.id, row);
      for (const row of deletes) rows.delete(row.id);
    },
  );

  // Most recent window, or null before the first notification arrives.
  return () => [...rows.values()].sort((a, b) => b.window_start.localeCompare(a.window_start))[0] ?? null;
}
