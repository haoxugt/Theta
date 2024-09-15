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

    for stock in stocks_list:

        info = stocks_info.tickers[stock].info
        # print("======",info)
        cp = stocks_info.tickers[stock].history(period='5d', interval='1d')['Close'].iloc[-1]
        # print("======",cp)
        target_stock = StockInfo.query.get(stock)
        target_stock.high_52wk = info['fiftyTwoWeekHigh']
        target_stock.low_52wk = info['fiftyTwoWeekLow']
        target_stock.market_cap = info.get('marketCap', info.get('totalAssets', '-'))
        target_stock.pe_ratio = info.get('trailingPE', 0)
        target_stock.high_today = info['dayHigh']
        target_stock.low_today = info['dayLow']
        target_stock.open_price = info['open']
        target_stock.current_price = round(info.get('currentPrice', float(cp)), 2)
        # target_stock.current_price = info.get('currentPrice', float(cp))
        # print("======currentPrice", round(info.get('currentPrice', cp), 2))
        target_stock.previous_close_price = info['previousClose']

        db.session.commit()


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
    target_stock = StockInfo.query.get(stockCode.upper())
    if target_stock:
        # print("======================================")
        current_price = stock.info.get('currentPrice', stock.history(period='5d', interval='1d')['Close'].iloc[-1])
        # print("======================================", current_price)
        previous_close_price = stock.info['previousClose']
        target_stock.current_price = round(float(current_price), 2)
        # target_stock.current_price = float(current_price)

        db.session.commit()

    date = []
    price = []
    for i in range(len(todays_data.index)):
        date.append(todays_data.index[i])
        # date.append(str(todays_data.index[i].tz_convert(local_tz)))
        price.append(todays_data['Close'][i])

    return {"stockdata": [date, price], "info": {"current_price": current_price, "previous_close_price": previous_close_price}}


@stockinfo_routes.route('/index')
@login_required
def getIndexInfo():

    index_list = ["^GSPC", "^IXIC", "^DJI"]
    index_info = yf.Tickers(" ".join(index_list))
    index_res_dict = {};

    for index in index_list:
        info = index_info.tickers[index].info
        index_res_dict[index] = {}
        index_res_dict[index]['previousClose'] = info['previousClose']
        todays_data = index_info.tickers[index].history(period='1d', interval='1m')
        if todays_data.empty:
            todays_data = index_info.tickers[index].history(period='1d', interval='1m')

        index_res_dict[index]['currentPrice'] = todays_data['Close'].iloc[-1]


    return {"indexs": index_res_dict}
