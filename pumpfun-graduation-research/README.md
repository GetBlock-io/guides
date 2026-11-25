# Pump.fun Graduation Research with GetBlock Market SQL

Research how many Pump.fun tokens graduate to PumpSwap, how fast they get there, which launches graduate most often, and what their price does after migration, using SQL over GetBlock's [Market SQL](https://docs.getblock.io/market-sql/overview) Solana dataset.

Full walkthrough: [How to Research Pump.fun Token Graduation with GetBlock Market SQL](https://docs.getblock.io/guides/how-to-research-pump.fun-token-graduation-with-getblock-market-sql)

## Requirements

- Python 3.9+
- A GetBlock account with **Market SQL → Solana** active (the free 2-hour trial is enough)
- Your GetBlock user ID and a `gb_…` API key from the [API Docs tab](https://account.getblock.io/products/sql#api-docs)

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # then fill in GETBLOCK_USER_ID and GETBLOCK_API_KEY
```

## Run

```bash
python inspect_tables.py   # check credentials and print each table's columns
python research.py         # run the research, print the report, write charts to out/
```

## Files

| File | What it does |
|---|---|
| `client.py` | A minimal Market SQL client: one authenticated HTTPS `POST` per query, returned as a DataFrame |
| `inspect_tables.py` | Runs `DESCRIBE TABLE` on the three tables used |
| `queries.py` | The SQL: launch cohort, funnel, graduates, bundled-buys breakdown, post-migration prices |
| `research.py` | Picks the study window, runs the queries, prints the report, saves charts and CSVs |

## Configuration

| Variable | Default | Meaning |
|---|---|---|
| `WINDOW_DAYS` | `1` | Days of launches to study: 1 on the trial plans (10 s query limit), up to 30 on Monthly (60 s). |
| `HORIZON_DAYS` | `2` | How long each launch is given to graduate before it counts as "never graduated". |
