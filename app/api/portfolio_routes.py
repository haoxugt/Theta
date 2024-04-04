from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Portfolio, StockHold
from datetime import datetime


portfolio_routes = Blueprint('portfolios', __name__)

@portfolio_routes.route('')
@login_required
def portfolios():
    portfolios = Portfolio.query.all()
    return {'portfolios': [portfolio.to_dict() for portfolio in portfolios]}

@portfolio_routes.route('', methods=["POST"])
@login_required
def createPortfolios():
    portfolio = request.get_json()['portfolio']
    user_id = current_user.id
    new_portfolio = Portfolio(title=portfolio['title'],
                              user_id=user_id,
                              open_date=datetime.now(),
                              is_retirement=portfolio['is_retirement'])
    db.session.add(new_portfolio)
    db.session.commit()

    return new_portfolio.to_dict()

@portfolio_routes.route('/<int:id>/makeorder', methods=["POST"])
@login_required
def buysellStockInPortfolio(id):
    order = request.get_json()['order']
    user_id = current_user.id
    portfolio = Portfolio.query.get(id)

    if not portfolio:
        return {"errors": {"message": "This portfolio counld not be found" }}, 404

    if user_id != portfolio.user_id:
        return {"errors": {"message": "Unauthorized" }}, 403

    if order['is_buy']:
        portfolio.cash -= float(order['transaction_price']) * float(order['shares'])
    else:
        portfolio.cash += float(order['transaction_price']) * float(order['shares'])

    db.session.commit()

    return portfolio.to_dict()

@portfolio_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deletePortfolio(id):
    portfolio = Portfolio.query.get(id)
    user_id = current_user.id

    if not portfolio:
        return {"errors": {"message": "This portfolio counld not be found" }}, 404

    if user_id != portfolio.user_id:
        return {"errors": {"message": "Unauthorized" }}, 403

    if portfolio.total_assets > 0:
        return {"errors": {"message": "You must cash out first for deleting" }}, 400

    db.session.delete(portfolio)
    db.session.commit()

    return {"message": "Successfully delete the portfolio"}


@portfolio_routes.route('/<int:id>/transfer', methods=["POST"])
@login_required
def transferPortfolio(id):
    transfer = request.get_json()['transfer']
    user_id = current_user.id
    portfolio = Portfolio.query.get(id)

    if not portfolio:
        return {"errors": {"message": "This portfolio counld not be found" }}, 404

    if user_id != portfolio.user_id:
        return {"errors": {"message": "Unauthorized" }}, 403

    if float(transfer['change']) + portfolio.cash < 0:
        return {"errors": {"message": "You don't have enough money to transfer out" }}, 400

    portfolio.cash += float(transfer['change'])
    portfolio.total_transfers += float(transfer['change'])
    portfolio.total_assets += float(transfer['change'])
    db.session.commit()

    return portfolio.to_dict()
