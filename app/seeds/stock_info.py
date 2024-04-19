from app.models import db, StockInfo, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stocks_info():

    SPY = StockInfo(
        code='SPY',
        name='SPDR S&P 500',
        quote_type='ETF',
        long_name='SPDR S&P 500 ETF Trust',
        high_52wk = 524.61,
        low_52wk = 403.74,
        market_cap= 503321591808,
        pe_ratio = 26.349379,
        high_today = 524.61,
        low_today = 522.7807,
        open_price = 523.21,
        current_price = 523.07,
        previous_close_price = 523.17,
        volume = 95383297
    )

    QQQ = StockInfo(
        code='QQQ',
        name='Invesco QQQ Trust',
        quote_type='ETF',
        long_name='Invesco QQQ Trust',
        high_52wk = 449.34,
        low_52wk = 309.89,
        market_cap = 254427725824,
        pe_ratio = 36.20614,
        high_today = 445.64,
        low_today = 443.65,
        open_price = 444.81,
        current_price = 444.01,
        previous_close_price = 444.83,
        volume = 36409430,
    )

    DIA = StockInfo(
        code='DIA',
        name='SPDR Dow Jones Industrial Avera',
        quote_type='ETF',
        long_name='SPDR Dow Jones Industrial Average ETF Trust',
        high_52wk = 398.82,
        low_52wk = 323.21,
        market_cap = 33252577280,
        pe_ratio = 23.54014,
        high_today = 398.555,
        low_today = 397.04,
        open_price = 398.06,
        current_price = 397.76,
        previous_close_price = 397.56,
        volume = 3153547,
    )

    AAPL = StockInfo(
        code='AAPL',
        name='Apple Inc.',
        quote_type='EQUITY',
        long_name='Apple Inc.',
        city='Cupertino',
        state='CA',
        country='United States',
        employees=161000,
        CEO='Mr. Timothy D. Cook',
        industry='Consumer Electronics',
        sector_disp='Technology',
        market_cap=2647976837120,
        high_52wk = 199.62,
        low_52wk = 159.78,
        pe_ratio = 26.668741,
        high_today = 172.23,
        low_today = 170.51,
        open_price = 171.7,
        current_price = 173.31,
        previous_close_price = 171.48,
        volume = 64574490,
    )

    NVDA = StockInfo(
        code='NVDA',
        name='NVIDIA Corporation',
        quote_type='EQUITY',
        long_name='NVIDIA Corporation',
        city='Santa Clara',
        state='CA',
        country='United States',
        employees=29600,
        CEO='Mr. Jen-Hsun  Huang',
        industry='Semiconductors',
        sector_disp='Technology',
        market_cap= 2258900090880,
        high_52wk = 974,
        low_52wk = 262.2,
        pe_ratio = 75.80201,
        high_today = 912.98,
        low_today = 891.93,
        open_price = 899.78,
        current_price = 903.56,
        previous_close_price = 902.50,
        volume = 43138138,
    )

    TSLA = StockInfo(
        code='TSLA',
        name='Tesla, Inc.',
        quote_type='EQUITY',
        long_name='Tesla, Inc.',
        city='Austin',
        state='TX',
        country='United States',
        employees=140473,
        CEO='Mr. Elon R. Musk',
        industry='Auto Manufacturers',
        sector_disp='Consumer Cyclical',
        market_cap= 559854190592,
        high_52wk = 299.29,
        low_52wk = 152.37,
        pe_ratio = 40.881393,
        high_today = 179.57,
        low_today = 175.3,
        open_price = 177.459,
        current_price = 175.79,
        previous_close_price = 179.83,
        volume = 76893057,
    )


    ENPH = StockInfo(
        code='ENPH',
        name='Enphase Energy, Inc.',
        quote_type='EQUITY',
        long_name='Enphase Energy, Inc.',
        city='Fremont',
        state='CA',
        country='United States',
        employees=3157,
        CEO='Mr. Badrinarayanan  Kothandaraman',
        industry='Solar',
        sector_disp='Technology',
        market_cap= 16424125440,
        high_52wk = 231.42,
        low_52wk = 73.49,
        pe_ratio = 39.279224,
        high_today = 124.3999,
        low_today = 119.395,
        open_price = 119.7,
        current_price = 120.98,
        previous_close_price = 119.80,
        volume = 2961396,
    )

    DIS = StockInfo(
        code='DIS',
        name='Walt Disney Company',
        quote_type='EQUITY',
        long_name='The Walt Disney Company',
        city='Burbank',
        state='CA',
        country='United States',
        employees=173250,
        CEO='Mr. Robert A. Iger',
        industry='Entertainment',
        sector_disp='Communication Services',
        market_cap= 224444956672,
        high_52wk = 123.74,
        low_52wk = 78.73,
        pe_ratio = 75.06748,
        high_today = 123.74,
        low_today = 121.2,
        open_price = 121.25,
        current_price = 122.36,
        previous_close_price = 120.98,
        volume = 15160255,
    )

    TSM = StockInfo(
        code='TSM',
        name='Taiwan Semiconductor Manufacturing',
        quote_type='EQUITY',
        long_name='Taiwan Semiconductor Manufacturing Company Limited',
        city='Hsinchu City',
        state='',
        country='Taiwan',
        employees=73090,
        CEO='Dr. C. C.  Wei',
        industry='Semiconductors',
        sector_disp='Technology',
        market_cap= 705692762112,
        high_52wk = 158.4,
        low_52wk = 81.21,
        pe_ratio = 26.887352,
        high_today = 136.8,
        low_today = 135.44,
        open_price = 135.68,
        current_price = 136.05,
        previous_close_price = 136.69,
        volume = 9919902,
    )

    NET = StockInfo(
        code='NET',
        name='Cloudflare, Inc.',
        quote_type='EQUITY',
        long_name='Cloudflare, Inc.',
        city='San Francisco',
        state='CA',
        country='United States',
        employees=3682,
        CEO='Mr. Matthew  Prince',
        industry='Software - Infrastructure',
        sector_disp='Technology',
        market_cap= 32695523328,
        high_52wk = 116,
        low_52wk = 39.9,
        pe_ratio = 124.14103,
        high_today = 97.6699,
        low_today = 96.1,
        open_price = 96.1,
        current_price = 96.83,
        previous_close_price = 96.55,
        volume = 1635121,
    )

    UNH = StockInfo(
        code='UNH',
        name='UnitedHealth Group Incorporated',
        quote_type='EQUITY',
        long_name='UnitedHealth Group Incorporated',
        city='Minnetonka',
        state='MN',
        country='United States',
        employees=440000,
        CEO='Sir Andrew Philip Witty',
        industry='Healthcare Plans',
        sector_disp='Healthcare',
        market_cap= 456080752640,
        high_52wk = 554.7,
        low_52wk = 445.68,
        pe_ratio = 20.724758,
        high_today = 495.87,
        low_today = 489.3,
        open_price = 495,
        current_price = 494.70,
        previous_close_price = 493.10,
        volume = 3805550,
    )

    MCD = StockInfo(
        code='MCD',
        name="McDonald's Corporation",
        quote_type='EQUITY',
        long_name="McDonald's Corporation",
        city='Chicago',
        state='IL',
        country='United States',
        employees=100000,
        CEO='Mr. Christopher J. Kempczinski',
        industry='Restaurants',
        sector_disp='Consumer Cyclical',
        market_cap= 203582554112,
        high_52wk = 302.39,
        low_52wk = 245.73,
        pe_ratio = 24.390139,
        high_today = 283.3799,
        low_today = 281.2525,
        open_price = 282.25,
        current_price = 281.95,
        previous_close_price = 282.02,
        volume = 3370364,
    )

    db.session.add(SPY)
    db.session.add(QQQ)
    db.session.add(DIA)
    db.session.add(AAPL)
    db.session.add(NVDA)
    db.session.add(TSLA)
    db.session.add(ENPH)
    db.session.add(DIS)
    db.session.add(TSM)
    db.session.add(NET)
    db.session.add(UNH)
    db.session.add(MCD)

    db.session.commit()


def undo_stocks_info():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks_info RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks_info"))

    db.session.commit()
