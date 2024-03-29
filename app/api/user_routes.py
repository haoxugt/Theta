from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Watchlist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
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
