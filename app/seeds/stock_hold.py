from app.models import db, StockHold, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stocks_hold():
    stock1 = StockHold(
        stock_info_code='NVDA',
        portfolio_id=1,
        avg_price=22.684,
        shares=40000
    )

    stock2 = StockHold(
        stock_info_code='ENPH',
        portfolio_id=3,
        avg_price=119.2,
        shares=3000
    )

    db.session.add(stock1)
    db.session.add(stock2)

    db.session.commit()


def undo_stocks_hold():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks_hold RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks_hold"))

    db.session.commit()
