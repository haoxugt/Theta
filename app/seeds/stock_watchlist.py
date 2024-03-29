from app.models import db, StockInfo, Watchlist, stocks_watchlists, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stocks_watchlists():
    watchlist1 =  Watchlist.query.get(1)
    watchlist2 =  Watchlist.query.get(2)
    watchlist3 =  Watchlist.query.get(3)
    watchlist4 =  Watchlist.query.get(4)

    SPY = StockInfo.query.get('SPY')
    QQQ = StockInfo.query.get('QQQ')
    DIA = StockInfo.query.get('DIA')
    AAPL = StockInfo.query.get('AAPL')
    NVDA = StockInfo.query.get('NVDA')
    TSLA = StockInfo.query.get('TSLA')
    ENPH = StockInfo.query.get('ENPH')
    DIS = StockInfo.query.get('DIS')
    TSM = StockInfo.query.get('TSM')
    NET = StockInfo.query.get('NET')
    UNH = StockInfo.query.get('UNH')
    MCD = StockInfo.query.get('MCD')

    watchlist1.stockinfo_in_watchlist.append(AAPL)
    watchlist1.stockinfo_in_watchlist.append(NVDA)
    watchlist1.stockinfo_in_watchlist.append(TSLA)
    watchlist1.stockinfo_in_watchlist.append(ENPH)
    watchlist1.stockinfo_in_watchlist.append(DIS)


    watchlist2.stockinfo_in_watchlist.append(SPY)
    watchlist2.stockinfo_in_watchlist.append(QQQ)
    watchlist2.stockinfo_in_watchlist.append(DIA)

    watchlist3.stockinfo_in_watchlist.append(NVDA)
    watchlist3.stockinfo_in_watchlist.append(TSM)

    watchlist4.stockinfo_in_watchlist.append(ENPH)
    watchlist4.stockinfo_in_watchlist.append(DIS)
    watchlist4.stockinfo_in_watchlist.append(NET)
    watchlist4.stockinfo_in_watchlist.append(UNH)
    watchlist4.stockinfo_in_watchlist.append(MCD)

    db.session.commit()


def undo_stocks_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks_watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks_watchlists"))

    db.session.commit()
