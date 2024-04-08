from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Portfolio, StockHold, Order, Transfer
from datetime import datetime
import yfinance as yf
import pandas as pd
# from matplotlib import pyplot as plt
import json


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

@portfolio_routes.route('/update', methods=["POST"])
# @login_required
def updatePortfolio():
    # user_id= current_user.id
    # portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()
    portfolios = Portfolio.query.all()
    base_stock = "SPY";

    for portfolio in portfolios:
        open_date = portfolio.open_date.date()
        base_ticker = yf.Ticker(base_stock)

        base_data = base_ticker.history(interval='1d', start=open_date)
        time_array = [time.date() for time in base_data.index]
        if not time_array:
            time_array = [datetime.now().date()]

        zeros = [0] * len(time_array)
        cash_history = [0] * len(time_array)
        tol_assets = [time_array, [0] * len(time_array)]
        time_obj = {time: index for index, time in enumerate(time_array)}
        # print("################################")
        # print(time_array)
        # print(time_obj)

        transfers = Transfer.query.filter(Transfer.portfolio_id == portfolio.id).all()

        for transfer in transfers:
            amount = transfer.amount if transfer.is_transfer_in else -transfer.amount
            transfer_date = transfer.transfer_date.date()
            index = time_obj[transfer_date]

            for i in range(index, len(time_array)):
                cash_history[i] += amount



        orders = Order.query.filter(Order.portfolio_id == portfolio.id).all()
        order_history = {}
        stock_set = set()
        for order in orders:
            transaction_price = order.transaction_price
            transaction_date = order.transaction_date.date()
            is_buy = order.is_buy
            shares = order.shares if is_buy else - order.shares
            amount = transaction_price * shares
            # print("---------------------------------------------------")
            # print(amount)
            index = time_obj[transaction_date]

            if order.stock_info_code in stock_set:
                for i in range(index, len(time_array)):
                    cash_history[i] -= amount
                    order_history[order.stock_info_code]["shares"][i] += shares
            else:
                stock_set.add(order.stock_info_code)
                order_history[order.stock_info_code] = {}
                order_history[order.stock_info_code]["shares"] = [0] * len(time_array)

                for i in range(index, len(time_array)):
                    cash_history[i] -= amount
                    order_history[order.stock_info_code]["shares"][i] = shares

        stock_tickers = yf.Tickers(" ".join(stock_set))
        for stock in stock_set:
            data = stock_tickers.tickers[stock].history(interval='1d', start=open_date)
            order_history[stock]["price"] = [0] * len(time_array)
            for i in range(len(time_array)):
                order_history[stock]["price"][i] = data['Close'][i]

        # print("=======================================")
        # print(order_history[order.stock_info_code]["price"])
        # print(order_history['NVDA']["shares"])
        # print(cash_history)
        # print(stock_set)
        # print(cash_history)

        for i in range(len(time_array)):
            tol_assets[1][i] += cash_history[i]
            for stock in stock_set:
                #  print("+++++++++++++++++++++++++++++++++++++++++++")
                #  keysList = list(order_history['ENPH'])
                #  print(keysList)
                #  print(stock)
                #  print(order_history[stock]["price"])
                 tol_assets[1][i] += order_history[stock]["shares"][i] * order_history[stock]["price"][i]

        # dict ={'date': time_array, 'asset': tol_assets[1]}
        df = pd.DataFrame(data={'assets': tol_assets[1]}, index=time_array)
        df.index.name = "date"
        # df.to_csv(f'./react-vite/public/csvs/portfolio-{portfolio.id}.csv', index=True)
        # plt.plot(df)
        # plt.show()
        with open(f'./react-vite/public/csvs/portfolio-{portfolio.id}-2.json', 'w') as file:
            file.write(json.dumps({"time": [str(time) for time in df.index], "assets": tol_assets[1]}))


    return {"message": "Mission complete"}

@portfolio_routes.route('/<int:id>/create', methods=["POST"])
# @login_required
def createPortfolioJSON(id):
    # portfolio = Portfolio.query.get(id)
    # print("==============================")
    # print(" id = ", id)
    # print("================================")
    with open(f'./react-vite/public/csvs/portfolio-{id}-2.json', 'w') as file:
        file.write(json.dumps({"time": [str(datetime.now().date())], "assets": [0]}))

    return {"message": "Mission complete"}
