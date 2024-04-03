from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Order, StockInfo, StockHold, Portfolio, LimitOrder
from datetime import datetime
from sqlalchemy import and_

order_routes = Blueprint('orders', __name__)

@order_routes.route('/current', methods=['GET'])
@login_required
def getCurrentOrders():
    user_id = current_user.id
    portfolio = Portfolio.query.filter(and_(Portfolio.user_id == user_id, Portfolio.is_retirement == False)).first()
    orders = Order.query.filter(Order.portfolio_id == portfolio.id).all()
    return {"orders": [order.to_dict() for order in orders]}

@order_routes.route("", methods=["POST"])
@login_required
def createOrder():
    user_id = current_user.id
    portfolio = Portfolio.query.filter(and_(Portfolio.user_id == user_id, Portfolio.is_retirement == False)).first()
    # form = CreateWatchlistForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    order = request.get_json()['order']
    if not order['is_limit_order']:
        new_order = Order(stock_info_code = order['stock_info_code'],
                          portfolio_id = order['portfolio_id'],
                          shares = order['shares'],
                          is_buy = order['is_buy'],
                          is_limit_order = order['is_limit_order'],
                          transaction_price = order['transaction_price'],
                          transaction_date = datetime.now())
        db.session.add(new_order)
        db.session.commit()

        return new_order.to_dict()
    else:
        new_limit_order = LimitOrder(limit_price = order['limit_price'],
                                     trading_type = order['trading_type'],
                                     expiration = order['expiration'])
        db.session.add(new_limit_order)
        new_order = Order(stock_info_code = order['stock_info_code'],
                          portfolio_id = portfolio.id,
                          shares = order['shares'],
                          is_buy = order['is_buy'],
                          is_limit_order = order['is_limit_order'],
                          limit_order_id = new_limit_order.id,
                          transaction_price = order['transaction_price'],
                          transaction_date = datetime.now)
        db.session.add(new_order)
        db.session.commit()

        return new_order.to_dict()
