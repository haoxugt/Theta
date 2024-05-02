from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Watchlist, StockInfo
from app.forms import CreateWatchlistForm

watchlist_routes = Blueprint('watchlists', __name__)

@watchlist_routes.route('/<int:id>', methods=['GET'])
@login_required
def getSingleWatchlist(id):
    target_watchlist = Watchlist.query.get(id)
    if not target_watchlist:
        return {"errors": {"message": "This watchlist counld not be found" }}, 404

    if current_user.id != target_watchlist.user_id:
        return {"errors": {"message": "Unauthorized" }}, 403

    return target_watchlist.to_dict()

@watchlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteWatchlist(id):
    target_watchlist = Watchlist.query.get(id)

    if not target_watchlist:
        return {"errors": {"message": "This watchlist counld not be found" }}, 404

    if current_user.id != target_watchlist.user_id:
        return {"errors": {"message": "Unauthorized" }}, 403

    if target_watchlist:
        name = target_watchlist.name
        db.session.delete(target_watchlist)
        db.session.commit()
        return {"message": f"Watchlist {name} is successfully deleted"}, 200


@watchlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateWatchlist(id):
    target_watchlist = Watchlist.query.get(id)
    form = CreateWatchlistForm();
    form['csrf_token'].data = request.cookies['csrf_token']

    if not target_watchlist:
        return {"errors": {"message": "This watchlist counld not be found" }}, 404

    if current_user.id != target_watchlist.user_id:
        return {"errors": {"message": "Unauthorized" }}, 403

    if form.validate_on_submit():
        target_watchlist.name = form.data["name"]
        db.session.commit()

    else:
        return form.errors, 400

    return target_watchlist.to_dict()


@watchlist_routes.route('/<int:id>/removestock', methods=['PUT'])
@login_required
def removeStockInWatchlist(id):
    target_watchlist = Watchlist.query.get(id)
    stockCode = request.get_json()['stockCode']
    target_stock = StockInfo.query.get(stockCode)


    if not target_stock:
        return {"errors": {"message": "This stock could not be found" }}, 404

    if not target_watchlist:
        return {"errors": {"message": "This watchlist could not be found" }}, 404

    if current_user.id != target_watchlist.user_id:
        return {"errors": {"message": "Unauthorized" }}, 403


    if target_stock in target_watchlist.stockinfo_in_watchlist:
        target_watchlist.stockinfo_in_watchlist.remove(target_stock)
        db.session.commit()
        return target_watchlist.to_dict()

    else:
        return {"errors": {"message": "This stock is not included in the watchlist" }}, 400


@watchlist_routes.route('/<int:id>/addstock', methods=['PUT'])
@login_required
def addStockToWatchlist(id):
    target_watchlist = Watchlist.query.get(id)
    stockCode = request.get_json()['stock']['code']
    target_stock = StockInfo.query.get(stockCode)


    if not target_stock:
        return {"errors": {"message": "This stock could not be found" }}, 404

    if not target_watchlist:
        return {"errors": {"message": "This watchlist could not be found" }}, 404

    if current_user.id != target_watchlist.user_id:
        return {"errors": {"message": "Unauthorized" }}, 403


    if target_stock in target_watchlist.stockinfo_in_watchlist:
        return {"errors": {"message": "This stock is already included in the watchlist" }}, 400

    else:
        # return {"errors": {"message": "This stock is not included in the watchlist" }}, 400
        target_watchlist.stockinfo_in_watchlist.append(target_stock)
        db.session.commit()
        return target_watchlist.to_dict()
