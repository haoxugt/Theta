from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, StockInfo
import yfinance as yf
import pandas as pd
from datetime import datetime


stockinfo_routes = Blueprint('stockinfo', __name__)

@stockinfo_routes.route('/<stockCode>')
@login_required
def getStockInfo(stockCode):
    stock = StockInfo.query.get(stockCode.upper());
    return {'stock': stock.to_dict()}

@stockinfo_routes.route('')
@login_required
def getAllStockInfo():
    stocks = StockInfo.query.all();
    stocks_list = [stock.code for stock in stocks]
    stocks_info = yf.Tickers(" ".join(stocks_list))
    # print(stocks_info.tickers['MCD'].info)
    for stock in stocks_list:
        print(f" starting {stock} ===========")
        info = stocks_info.tickers[stock].info
        target_stock = StockInfo.query.get(stock)
        target_stock.high_52wk = info['fiftyTwoWeekHigh']
        target_stock.low_52wk = info['fiftyTwoWeekLow']
        target_stock.market_cap = info.get('marketCap', info.get('totalAssets', '-'))
        target_stock.pe_ratio = info.get('trailingPE', 0)
        target_stock.high_today = info['dayHigh']
        target_stock.low_today = info['dayLow']
        target_stock.open_price = info['open']
        target_stock.current_price = info.get('currentPrice',stocks_info.tickers[stock].history(period='2d', interval='1d')['Close'].iloc[-1])
        target_stock.previous_close_price = info['previousClose']

        db.session.commit()
        print(f" {stock} is done ===========")

    return {'stocks': [s.to_dict() for s in stocks]}





    # return {'stocks': [stock.to_dict() for stock in stocks]}

@stockinfo_routes.route('/<stockCode>/data')
@login_required
def getStockDataInfo(stockCode):
    stock = yf.Ticker(stockCode)
    todays_data = stock.history(period='1d', interval='5m')
    # change time to local time, depreciated, will be handled in frontend due to converting to string not datetime type.
    # now = datetime.now()
    # local_now = now.astimezone()
    # local_tz = local_now.tzinfo

    date = []
    price = []
    for i in range(len(todays_data.index)):
        date.append(todays_data.index[i])
        # date.append(str(todays_data.index[i].tz_convert(local_tz)))
        price.append(todays_data['Close'][i])

    return {'stockdata': [date, price], }
