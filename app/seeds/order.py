from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_orders():
    order1 = Order(
        stock_info_code='NVDA',
        portfolio_id=1,
        shares=40000,
        transaction_price=22.684,
        transaction_date=datetime(2023,3,1,16,0,0)
    )

    order2 = Order(
        stock_info_code='NVDA',
        portfolio_id=3,
        shares=8000,
        transaction_price=22.684,
        transaction_date=datetime(2023,3,1,16,0,0)
    )

    order3 = Order(
        stock_info_code='NVDA',
        portfolio_id=3,
        shares=8000,
        is_buy=False,
        transaction_price=50.204,
        transaction_date=datetime(2023,8,24,9,30,0)
    )

    order4 = Order(
        stock_info_code='ENPH',
        portfolio_id=3,
        shares=3000,
        transaction_price=119.2,
        transaction_date=datetime(2023,10,2,9,30,0)
    )

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.add(order4)

    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
