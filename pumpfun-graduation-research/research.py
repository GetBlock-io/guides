"""Pump.fun graduation research on GetBlock Market SQL.

For a window of Pump.fun launches, answers:
  1. How many tokens graduate to PumpSwap, and how fast?
  2. Do launches with bundled buys graduate more often?
  3. What happens to a graduate's price after migration?
"""
import os
from datetime import timedelta
from pathlib import Path

import matplotlib
import pandas as pd

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402

import queries  # noqa: E402
from client import get_client  # noqa: E402

OUT = Path("out")
WINDOW_DAYS = int(os.getenv("WINDOW_DAYS", "1"))
HORIZON_DAYS = int(os.getenv("HORIZON_DAYS", "2"))
CHECKPOINTS = ("5m", "1h", "24h")


def study_window(client):
    """End the window HORIZON_DAYS before the newest data, so every launch
    in it has had the full horizon to graduate."""
    latest = pd.Timestamp(client.query_df(queries.LATEST_LAUNCH)["latest"].iloc[0])
    end = latest.normalize() - timedelta(days=HORIZON_DAYS)
    start = end - timedelta(days=WINDOW_DAYS)
    return start, end


def post_migration_returns(client, params):
    df = client.query_df(queries.POST_MIGRATION, params)
    for label in CHECKPOINTS:
        price = df[f"price_{label}"].where(df[f"price_{label}"] > 0)  # 0 = no trade yet
        df[f"return_{label}_pct"] = (price / df["migration_price"] - 1) * 100
    return df


def print_report(start, end, funnel, bundles, returns):
    print(f"\nWindow: launches from {start:%Y-%m-%d %H:%M} to {end:%Y-%m-%d %H:%M} UTC")
    print(f"Horizon: {HORIZON_DAYS} days to graduate, 24 h of trading after migration\n")

    print("1. Graduation funnel")
    print(f"   Launches          {int(funnel['launches']):>10,}")
    print(f"   Graduated         {int(funnel['graduated']):>10,}")
    print(f"   Graduation rate   {funnel['graduation_rate_pct']:>10.2f} %")
    print(f"   Median time       {funnel['median_minutes_to_graduate']:>10.0f} min")
    print(f"   90th percentile   {funnel['p90_minutes_to_graduate']:>10.0f} min\n")

    print("2. Graduation rate by bundled buys at launch")
    for _, row in bundles.iterrows():
        print(f"   {row['bundled_buys']:>3} bundled   {int(row['launches']):>7,} launches   "
              f"{int(row['graduated']):>4} graduated   {row['graduation_rate_pct']:>6.2f} %")

    print("\n3. Price after migration (vs. the PumpSwap pool's opening price)")
    if returns.empty:
        print("   No PumpSwap trades found for the graduates in this window.")
        return
    print(f"   Graduates with PumpSwap trades: {len(returns):,}")
    for label in CHECKPOINTS:
        col = returns[f"return_{label}_pct"].dropna()
        print(f"   +{label:<4} median {col.median():>7.1f} %   "
              f"above opening price: {(col > 0).mean() * 100:>5.1f} % of tokens")


def save_charts(funnel, graduates, bundles, returns):
    OUT.mkdir(exist_ok=True)
    blue, grey = "#2f6fed", "#9aa5b1"

    fig, ax = plt.subplots(figsize=(6, 4))
    ax.bar(["Launched", "Graduated"], [funnel["launches"], funnel["graduated"]], color=[grey, blue])
    ax.set_yscale("log")
    ax.set_ylabel("Tokens (log scale)")
    ax.set_title(f"Pump.fun graduation funnel: {funnel['graduation_rate_pct']:.2f} % graduate")
    fig.tight_layout()
    fig.savefig(OUT / "funnel.png", dpi=150)

    fig, ax = plt.subplots(figsize=(7, 4))
    minutes = graduates["minutes_to_graduate"].clip(lower=1)
    bins = [1, 2, 5, 10, 30, 60, 180, 360, 720, 1440, 2880]
    ax.hist(minutes, bins=bins, color=blue)
    ax.set_xscale("log")
    ax.set_xticks(bins, ["1m", "2m", "5m", "10m", "30m", "1h", "3h", "6h", "12h", "1d", "2d"])
    ax.set_xlabel("Time from creation to migration")
    ax.set_ylabel("Graduated tokens")
    ax.set_title("Time to graduation")
    fig.tight_layout()
    fig.savefig(OUT / "time_to_graduation.png", dpi=150)

    fig, ax = plt.subplots(figsize=(6, 4))
    ax.bar(bundles["bundled_buys"].astype(str), bundles["graduation_rate_pct"], color=blue)
    ax.set_xlabel("Buys bundled into the launch transaction")
    ax.set_ylabel("Graduation rate (%)")
    ax.set_title("Graduation rate by bundled buys")
    fig.tight_layout()
    fig.savefig(OUT / "graduation_by_bundle.png", dpi=150)

    if not returns.empty:
        fig, ax = plt.subplots(figsize=(7, 4))
        series = [returns[f"return_{label}_pct"].dropna() for label in CHECKPOINTS]
        ax.boxplot(series, showfliers=False)
        ax.set_xticks([1, 2, 3], ["+5 min", "+1 h", "+24 h"])
        ax.axhline(0, color="#d64545", linewidth=1)
        ax.set_ylabel("Return vs. pool opening price (%)")
        ax.set_title("Price after migration")
        fig.tight_layout()
        fig.savefig(OUT / "post_migration_returns.png", dpi=150)

    graduates.to_csv(OUT / "graduates.csv", index=False)
    returns.to_csv(OUT / "post_migration.csv", index=False)


def main():
    client = get_client()
    start, end = study_window(client)
    params = {
        "start": f"{start:%Y-%m-%d %H:%M:%S}",
        "end": f"{end:%Y-%m-%d %H:%M:%S}",
        "horizon": HORIZON_DAYS,
    }

    funnel = client.query_df(queries.FUNNEL, params).iloc[0]
    graduates = client.query_df(queries.GRADUATES, params)
    bundles = client.query_df(queries.BY_BUNDLE, params)
    returns = post_migration_returns(client, params)

    print_report(start, end, funnel, bundles, returns)
    save_charts(funnel, graduates, bundles, returns)
    print(f"\nCharts and CSVs written to {OUT.resolve()}")


if __name__ == "__main__":
    main()
