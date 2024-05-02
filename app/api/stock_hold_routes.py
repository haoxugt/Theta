from flask import Blueprint, request
from app.models import db, StockInfo, StockHold, Order
from sqlalchemy import and_

stockhold_routes = Blueprint('stockhold', __name__)

@stockhold_routes.route('/buy', methods=['POST'])
def buyStockHold():
    order = request.get_json()['order']
    stockCode = order['stock_info_code']
    portfolio_id = order['portfolio_id']
    # stockinfo = StockInfo.query.get(stockCode);

    prev_stock_hold = StockHold.query.filter(and_(StockHold.stock_info_code == stockCode, StockHold.portfolio_id == portfolio_id)).first()


    if not prev_stock_hold:
        new_stock_hold = StockHold(
           stock_info_code=stockCode,
           portfolio_id=order['portfolio_id'],
           avg_price=order['transaction_price'],
           shares=order['shares']
        )
        db.session.add(new_stock_hold)
        db.session.commit()

        return new_stock_hold.to_dict()
    else:
        prev_stock_hold.avg_price = (prev_stock_hold.avg_price * prev_stock_hold.shares
            + order['transaction_price'] * order['shares']) / (prev_stock_hold.shares + order['shares'])
        prev_stock_hold.shares += order['shares']
        db.session.commit()

        return prev_stock_hold.to_dict()


@stockhold_routes.route('/sell', methods=['POST'])
def sellStockHold():
    order = request.get_json()['order']
    stockCode = order['stock_info_code']
    portfolio_id = order['portfolio_id']
    # stockinfo = StockInfo.query.get(stockCode);
    prev_stock_hold = StockHold.query.filter(and_(StockHold.stock_info_code == stockCode, StockHold.portfolio_id == portfolio_id)).first()

    if not prev_stock_hold:
        return {"errors": {"message": "This stock is not hold" }}, 400
    else:
        if prev_stock_hold.shares < order['shares']:
            return {"errors": {"message": "You sell more than you hold" }}, 400
        elif prev_stock_hold.shares == order['shares']:
            db.session.delete(prev_stock_hold)
            db.session.commit()
            return {"message": f"You sell all of {stockCode} stock"}, 200
        else:
            prev_stock_hold.shares -= order['shares']
            db.session.commit()

            return prev_stock_hold.to_dict()
