from flask import Blueprint
# from flask_login import login_required, current_user
from app.models import StockInfo
import yfinance as yf
import pandas as pd


stockinfo_routes = Blueprint('stockinfo', __name__)

@stockinfo_routes.route('/<stockCode>')
def getStockInfo(stockCode):
    stock = StockInfo.query.get(stockCode.upper());
    return {'stock': stock.to_dict()}
