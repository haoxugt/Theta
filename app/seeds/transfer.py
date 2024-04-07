from app.models import db, Transfer, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_transfers():
    transfer1 = Transfer(
        portfolio_id = 1,
        amount=1200000.0,
        transfer_date=datetime(2023,2,1,9,30,0)
    )
    transfer2 = Transfer(
        portfolio_id = 2,
        amount=6000.0,
        transfer_date=datetime(2024,1,2,9,30,0)
    )
    transfer3 = Transfer(
        portfolio_id = 3,
        amount=200000.0,
        transfer_date=datetime(2023,2,1,9,30,0)
    )
    transfer4 = Transfer(
        portfolio_id = 4,
        amount=6000.0,
        transfer_date=datetime(2023,2,1,9,30,0)
    )
    transfer5 = Transfer(
        portfolio_id = 5,
        amount=700000.0,
        transfer_date=datetime(2023,2,1,9,30,0)
    )
    transfer6 = Transfer(
        portfolio_id = 6,
        amount=500000.0,
        transfer_date=datetime(2023,2,1,9,30,0)
    )
    transfer7 = Transfer(
        portfolio_id = 7,
        amount=800000.0,
        transfer_date=datetime(2023,2,1,9,30,0)
    )


    transfer8 = Transfer(
        portfolio_id = 1,
        is_transfer_in=False,
        amount=200000.0,
        transfer_date=datetime(2024,2,1,15,0,0)
    )
    transfer9 = Transfer(
        portfolio_id = 4,
        amount=6500.0,
        transfer_date=datetime(2024,1,2,9,30,0)
    )

    db.session.add(transfer1)
    db.session.add(transfer2)
    db.session.add(transfer3)
    db.session.add(transfer4)
    db.session.add(transfer5)
    db.session.add(transfer6)
    db.session.add(transfer7)
    db.session.add(transfer8)
    db.session.add(transfer9)

    db.session.commit()


def undo_transfers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transfers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transfers"))

    db.session.commit()
