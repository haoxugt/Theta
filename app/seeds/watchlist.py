from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():
    watchlist1 = Watchlist(
        name='All',
        user_id=1
    )
    watchlist2 = Watchlist(
        name='ETF',
        user_id=2
    )
    watchlist3 = Watchlist(
        name='Semiconductors',
        user_id=2
    )
    watchlist4 = Watchlist(
        name='Others',
        user_id=2
    )

    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)
    db.session.add(watchlist4)

    db.session.commit()


def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
