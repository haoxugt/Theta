from flask.cli import AppGroup
from .users import seed_users, undo_users
from .potfolio import seed_portfolios, undo_portfolios
from .stock_info import seed_stocks_info, undo_stocks_info
from .transfer import seed_transfers, undo_transfers
from .watchlist import seed_watchlists, undo_watchlists
from .stock_watchlist import seed_stocks_watchlists, undo_stocks_watchlists
from .order import seed_orders, undo_orders
from .stock_hold import seed_stocks_hold, undo_stocks_hold


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_stocks_hold()
        undo_orders()
        undo_stocks_watchlists()
        undo_watchlists()
        undo_transfers()
        undo_stocks_info()
        undo_portfolios()
        undo_users()
    seed_users()
    seed_portfolios()
    seed_stocks_info()
    seed_transfers()
    seed_watchlists()
    seed_stocks_watchlists()
    seed_orders()
    seed_stocks_hold()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_stocks_hold()
    undo_orders()
    undo_stocks_watchlists()
    undo_watchlists()
    undo_transfers()
    undo_stocks_info()
    undo_portfolios()
    undo_users()
    # Add other undo functions here
