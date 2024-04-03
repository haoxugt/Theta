from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_portfolios():
    portfolio1 = Portfolio(
        title = "Long term",
        cash = 92640.0,
        total_transfers = 1000000.0,
        total_assets = 3706880.0,
        user_id = 1,
        open_date = datetime(2023, 1, 1)
    )

    portfolio2 = Portfolio(
        title = "IRS",
        cash = 6000.0,
        total_transfers = 6000.0,
        total_assets = 6000.0,
        user_id = 1,
        is_retirement=True,
        open_date = datetime(2023, 1, 1)
    )

    portfolio3 = Portfolio(
        title = "Long term",
        cash = 62560.0,
        total_transfers = 200000.0,
        total_assets = 425500.0,
        user_id = 2,
        open_date = datetime(2023, 1, 1)
    )

    portfolio4 = Portfolio(
        title = "IRS",
        cash = 12500.0,
        total_transfers = 12500.0,
        total_assets = 12500.0,
        user_id = 2,
        is_retirement=True,
        open_date = datetime(2022, 1, 1)
    )

    portfolio5 = Portfolio(
        title = "Long term",
        cash = 700000.0,
        total_transfers = 700000.0,
        total_assets = 700000.0,
        user_id = 3,
        open_date = datetime(2023, 1, 1)
    )

    portfolio6 = Portfolio(
        title = "Long term",
        cash = 500000.0,
        total_transfers = 500000.0,
        total_assets = 500000.0,
        user_id = 4,
        open_date = datetime(2023, 1, 1)
    )

    portfolio7 = Portfolio(
        title = "Long term",
        cash = 800000.0,
        total_transfers = 800000.0,
        total_assets = 800000.0,
        user_id = 5,
        open_date = datetime(2023, 1, 1)
    )

    db.session.add(portfolio1)
    db.session.add(portfolio2)
    db.session.add(portfolio3)
    db.session.add(portfolio4)
    db.session.add(portfolio5)
    db.session.add(portfolio6)
    db.session.add(portfolio7)

    db.session.commit()

def undo_portfolios():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()
