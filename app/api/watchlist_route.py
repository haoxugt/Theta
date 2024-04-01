from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Watchlist
from app.forms import CreateWatchlistForm

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteWatchlist(id):
    target_watchlist = Watchlist.query.get(id)
    user_id = current_user.id

    if not target_watchlist:
        return {"errors": {"message": "This watchlist counld not be found" }}, 404

    if user_id != target_watchlist.user_id:
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
    user_id = current_user.id

    if not target_watchlist:
        return {"errors": {"message": "This watchlist counld not be found" }}, 404

    if user_id != target_watchlist.user_id:
        return {"errors": {"message": "Unauthorized" }}, 403

    if form.validate_on_submit():
        target_watchlist.name = form.data["name"]
        db.session.commit()

    else:
        return form.errors, 401

    return target_watchlist.to_dict()
