import io
import os

import pandas as pd
import requests
from dotenv import load_dotenv

load_dotenv()

MARKET_SQL_URL = "https://market-sql.eu-central-1.getblock.io"


class MarketSQL:
    """A minimal client for GetBlock Market SQL over the ClickHouse HTTP interface."""

    def __init__(self, database="solana"):
        user_id = os.getenv("GETBLOCK_USER_ID")
        api_key = os.getenv("GETBLOCK_API_KEY")
        if not user_id or not api_key:
            raise SystemExit("Set GETBLOCK_USER_ID and GETBLOCK_API_KEY in .env")
        self.database = database
        self.session = requests.Session()
        self.session.auth = (user_id, api_key)  # HTTP Basic Auth

    def query_df(self, sql, params=None):
        """Run one read-only SQL statement and return the rows as a DataFrame.

        `params` fill ClickHouse placeholders such as {start:DateTime}. They are
        sent as `param_<name>` URL parameters, separately from the SQL text.
        """
        url_params = {"database": self.database, "default_format": "CSVWithNames"}
        for name, value in (params or {}).items():
            url_params[f"param_{name}"] = str(value)

        response = self.session.post(
            MARKET_SQL_URL,
            params=url_params,
            data=sql.encode(),
            timeout=120,
        )
        if response.status_code != 200:
            raise RuntimeError(f"Market SQL error {response.status_code}: {response.text.strip()}")
        if not response.text.strip():
            return pd.DataFrame()
        return pd.read_csv(io.StringIO(response.text))


def get_client():
    return MarketSQL()
