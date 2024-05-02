from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Watchlist, Portfolio, StockHold
from app.forms import CreateWatchlistForm
from sqlalchemy import and_

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# get current user
@user_routes.route("/current")
@login_required
def getCurrentUser():

    user = current_user.to_dict()
    return {"user": user}


# get all the watchlists belongs to current user
@user_routes.route("/current/watchlists", methods=["GET"])
@login_required
def getCurrentUserWatchlists():
    user = current_user.to_dict()
    watchlists = Watchlist.query.join(User).filter(User.id == user["id"]).all()
    return {"watchlists": [watchlist.to_dict() for watchlist in watchlists]}


# get all the portfolios belongs to current user
@user_routes.route("/current/portfolios", methods=["GET"])
@login_required
def getCurrentUserPortfolios():
    user_id= current_user.id
    portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()
    return {"portfolios": [portfolio.to_dict() for portfolio in portfolios]}

# get all thecurrent user's stocks under investing portfolio
@user_routes.route("/current/portfolios/stockshold", methods=["GET"])
@login_required
def getCurrentUserStocksholdPortfolio():
    user_id = current_user.id
    portfolio1 = Portfolio.query.filter(Portfolio.user_id == user_id).filter(Portfolio.is_retirement == False).first()
    stocks1 = [stock.to_dict() for stock in portfolio1.stockhold_in_portfolio]
    portfolio2 = Portfolio.query.filter(Portfolio.user_id == user_id).filter(Portfolio.is_retirement == True).first()

    stocks2 = []
    if portfolio2:
        stocks2 = [stock.to_dict() for stock in portfolio2.stockhold_in_portfolio]
    stocks = stocks1 + stocks2
    return {"Stockshold": stocks}

# get all the investing portfolio belongs to current user
@user_routes.route("/current/portfolios/investing", methods=["GET"])
@login_required
def getCurrentUserInvestingPortfolio():
    user_id = current_user.id
    portfolio = Portfolio.query.filter(Portfolio.user_id == user_id).filter(Portfolio.is_retirement == False).first()
    return {"Investing": portfolio.to_dict()}

# get all thecurrent user's stocks under investing portfolio
@user_routes.route("/current/portfolios/investing/stockshold", methods=["GET"])
@login_required
def getCurrentUserStocksholdInInvestingPortfolio():
    user_id = current_user.id
    portfolio = Portfolio.query.filter(Portfolio.user_id == user_id).filter(Portfolio.is_retirement == False).first()
    stocks = [stock.to_dict() for stock in portfolio.stockhold_in_portfolio]
    return {"Stockshold": stocks}

# get all the retirement portfolio belongs to current user
@user_routes.route("/current/portfolios/retirement", methods=["GET"])
@login_required
def getCurrentUserRetirementPortfolio():
    user_id = current_user.id
    portfolio = Portfolio.query.filter(and_(Portfolio.user_id == user_id, Portfolio.is_retirement == True)).first()
    return {"Retirement": portfolio.to_dict()}

# get all the current user's stocks under retirement portfolio
@user_routes.route("/current/portfolios/retirement/stockshold", methods=["GET"])
@login_required
def getCurrentUserStocksholdInRetirementPortfolio():
    user_id = current_user.id
    portfolio = Portfolio.query.filter(Portfolio.user_id == user_id).filter(Portfolio.is_retirement == True).first()
    stocks = [stock.to_dict() for stock in portfolio.stockhold_in_portfolio]
    return {"Stockshold": stocks}

# create a new watchlist belongs to current user
@user_routes.route("/current/watchlists", methods=["POST"])
@login_required
def createWatchlist():
    user_id = current_user.id
    form = CreateWatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_watchlist = Watchlist(name=data['name'],
                              user_id=user_id)
        db.session.add(new_watchlist)
        db.session.commit()

        return new_watchlist.to_dict()

    else:

        return form.errors, 400
