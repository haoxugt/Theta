from flask import Blueprint
from flask_login import login_required, current_user
from app.models import StockInfo
import yfinance as yf
import pandas as pd


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
    return {'stocks': [stock.to_dict() for stock in stocks]}

@stockinfo_routes.route('/<stockCode>/data')
@login_required
def getStockDataInfo(stockCode):
    stock = yf.Ticker(stockCode)
    todays_data = stock.history(period='1d', interval='5m')
    date = []
    price = []
    for i in range(len(todays_data.index)):
        date.append(todays_data.index[i])
        price.append(todays_data['Close'][i])

    return {'stockdata': [date, price]}
