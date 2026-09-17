const SEEN_LIMIT = 5000;

export function watchWhales(stream, { base, quote, minQuote }, onWhale) {
  const seen = new Set();
  let primed = false;

  stream.subscribe(
    {
      source: 'market',
      topic: 'trades',
      // Keep hydrate at its maximum. A small value drops trades when several
      // land between two pushes — fatal for a bot that must see every fill.
      params: { base, quote, hydrate: 100, throttle: '250ms' },
    },
    ({ inserts = [] }, isSnapshot) => {
      // The very first backfill is history from before the bot started:
      // remember it, but don't alert on it.
      const silent = isSnapshot && !primed;
      if (isSnapshot) primed = true;

      for (const trade of inserts) {
        // Alerts are side effects, so each trade id fires at most once. After a
        // reconnect this also lets the new backfill surface whales that traded
        // while the bot was offline, without repeating ones already sent.
        if (seen.has(trade.id)) continue;
        seen.add(trade.id);
        if (seen.size > SEEN_LIMIT) seen.delete(seen.values().next().value);

        if (!silent && Number(trade.quote_volume) >= minQuote) onWhale(trade);
      }
      // `deletes` are ignored: on this topic they are almost always the oldest
      // trades leaving the 100-row window, not retractions.
    },
  );
}
