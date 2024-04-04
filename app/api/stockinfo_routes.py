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
