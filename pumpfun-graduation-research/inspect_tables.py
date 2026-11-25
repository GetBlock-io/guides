"""Print the columns of every table this research uses.

Run this first: it confirms your credentials work and shows the exact
column names the queries in queries.py rely on.
"""
from client import get_client

TABLES = [
    "pumpfun_token_creation",
    "pfamm_migrations",
    "pumpswap_all_swaps",
]


def main():
    client = get_client()
    for table in TABLES:
        columns = client.query_df(f"DESCRIBE TABLE {table}")
        print(f"\n{table} ({len(columns)} columns)")
        for _, col in columns.iterrows():
            print(f"  {col['name']:<36} {col['type']}")


if __name__ == "__main__":
    main()
