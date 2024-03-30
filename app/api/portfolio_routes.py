from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, Portfolio, StockHold


portfolio_routes = Blueprint('portfolios', __name__)

@portfolio_routes.route('')
@login_required
def portfolios():
    portfolios = Portfolio.query.all()
    return {'portfolios': [portfolio.to_dict() for portfolio in portfolios]}
