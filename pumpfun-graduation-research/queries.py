"""SQL for the graduation research, run server-side on Market SQL.

Every query is bounded by {start}/{end} on block_time so it finishes inside
the execution limit of your plan (10 seconds on the trials).
"""

WSOL = "So11111111111111111111111111111111111111112"

# Newest launch in the dataset: the study window is placed behind it.
LATEST_LAUNCH = "SELECT max(block_time) AS latest FROM pumpfun_token_creation"

# Shared building blocks:
#   launches   - every Pump.fun token created inside the window
#   graduates  - the launches that migrated to PumpSwap within the horizon,
#                with the pool's opening price (lamports per raw token unit)
COHORT = """
WITH
launches AS (
    -- mint is a FixedString(48) here; toString() makes it joinable with String mints
    SELECT
        toString(mint) AS mint,
        min(block_time) AS created_at,
        max(bundled_buys_count) AS bundled_buys
    FROM pumpfun_token_creation
    WHERE block_time >= {start:DateTime} AND block_time < {end:DateTime}
    GROUP BY mint
),
graduates AS (
    SELECT
        mint,
        min(block_time) AS migrated_at,
        argMin(sol_amount / mint_amount, (slot, tx_idx)) AS migration_price
    FROM pfamm_migrations
    WHERE block_time >= {start:DateTime}
      AND block_time < {end:DateTime} + toIntervalDay({horizon:UInt16})
      AND mint IN (SELECT mint FROM launches)
    GROUP BY mint
)
"""

# 1. The funnel: how many launched, how many graduated, how fast.
FUNNEL = COHORT + """
SELECT
    count() AS launches,
    countIf(g.mint != '') AS graduated,
    round(graduated / launches * 100, 3) AS graduation_rate_pct,
    quantileIf(0.5)(dateDiff('minute', l.created_at, g.migrated_at), g.mint != '')
        AS median_minutes_to_graduate,
    quantileIf(0.9)(dateDiff('minute', l.created_at, g.migrated_at), g.mint != '')
        AS p90_minutes_to_graduate
FROM launches AS l
LEFT JOIN graduates AS g ON g.mint = l.mint
"""

# 2. One row per graduate, for the time-to-graduation chart.
GRADUATES = COHORT + """
SELECT
    l.mint AS mint,
    l.created_at AS created_at,
    g.migrated_at AS migrated_at,
    dateDiff('minute', l.created_at, g.migrated_at) AS minutes_to_graduate
FROM launches AS l
INNER JOIN graduates AS g ON g.mint = l.mint
ORDER BY minutes_to_graduate
"""

# 3. Do launches with buys bundled into the creation transaction graduate
#    more often than launches without?
BY_BUNDLE = COHORT + """
SELECT
    multiIf(l.bundled_buys = 0, '0',
            l.bundled_buys = 1, '1',
            l.bundled_buys <= 4, '2-4',
            '5+') AS bundled_buys,
    count() AS launches,
    countIf(g.mint != '') AS graduated,
    round(graduated / launches * 100, 2) AS graduation_rate_pct
FROM launches AS l
LEFT JOIN graduates AS g ON g.mint = l.mint
GROUP BY bundled_buys
ORDER BY bundled_buys
"""

# 4. What happened next: each graduate's last traded price on PumpSwap at
#    +5 min, +1 h and +24 h after migration, against the pool's opening price.
#    A PumpSwap pool can list the token on either side, so prices are
#    normalised to lamports per raw token unit whichever side WSOL is on.
POST_MIGRATION = COHORT + """
, swaps AS (
    SELECT
        block_time,
        slot,
        tx_idx,
        if(base_token = '{wsol}', quote_token, base_token) AS mint,
        if(base_token = '{wsol}',
           base_token_amount / quote_token_amount,
           quote_token_amount / base_token_amount) AS price
    FROM pumpswap_all_swaps
    WHERE block_time >= {start:DateTime}
      AND block_time < {end:DateTime} + toIntervalDay({horizon:UInt16} + 1)
      AND (base_token IN (SELECT mint FROM graduates)
           OR quote_token IN (SELECT mint FROM graduates))
      AND base_token_amount > 0 AND quote_token_amount > 0
)
SELECT
    g.mint AS mint,
    g.migrated_at AS migrated_at,
    g.migration_price AS migration_price,
    count() AS swaps_24h,
    argMaxIf(s.price, (s.slot, s.tx_idx),
             s.block_time <= g.migrated_at + INTERVAL 5 MINUTE) AS price_5m,
    argMaxIf(s.price, (s.slot, s.tx_idx),
             s.block_time <= g.migrated_at + INTERVAL 1 HOUR) AS price_1h,
    argMax(s.price, (s.slot, s.tx_idx)) AS price_24h,
    max(s.block_time) AS last_swap
FROM swaps AS s
INNER JOIN graduates AS g ON g.mint = s.mint
WHERE s.block_time >= g.migrated_at
  AND s.block_time < g.migrated_at + INTERVAL 1 DAY
GROUP BY g.mint, g.migrated_at, g.migration_price
""".replace("{wsol}", WSOL)
