"""empty message

Revision ID: 97141e6e8328
Revises:
Create Date: 2024-03-28 21:30:18.783483

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '97141e6e8328'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('limit_orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('limit_price', sa.Float(), nullable=False),
    sa.Column('trading_type', sa.Integer(), nullable=False),
    sa.Column('expiration', sa.DateTime(), nullable=True),
    sa.Column('is_pending', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE limit_orders SET SCHEMA {SCHEMA};")

    op.create_table('stocks_info',
    sa.Column('code', sa.String(length=5), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('quote_type', sa.String(length=40), nullable=False),
    sa.Column('long_name', sa.String(length=200), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=True),
    sa.Column('state', sa.String(length=50), nullable=True),
    sa.Column('country', sa.String(length=50), nullable=True),
    sa.Column('employees', sa.Integer(), nullable=True),
    sa.Column('CEO', sa.String(length=50), nullable=True),
    sa.Column('industry', sa.String(length=50), nullable=True),
    sa.Column('sector_disp', sa.String(length=50), nullable=True),
    sa.Column('high_52wk', sa.Float(), nullable=False),
    sa.Column('low_52wk', sa.Float(), nullable=False),
    sa.Column('market_cap', sa.Float(), nullable=False),
    sa.Column('pe_ratio', sa.Float(), nullable=False),
    sa.Column('high_today', sa.Float(), nullable=False),
    sa.Column('low_today', sa.Float(), nullable=False),
    sa.Column('open_price', sa.Float(), nullable=False),
    sa.Column('current_price', sa.Float(precision=2), nullable=False),
    sa.Column('previous_close_price', sa.Float(), nullable=False),
    sa.Column('volume', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('code')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE stocks_info SET SCHEMA {SCHEMA};")

    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=False),
    sa.Column('last_name', sa.String(length=100), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('watchlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE watchlists SET SCHEMA {SCHEMA};")

    op.create_table('portfolios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('cash', sa.Float(), nullable=True),
    sa.Column('total_transfers', sa.Float(), nullable=True),
    sa.Column('total_assets', sa.Float(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('open_date', sa.DateTime(), nullable=False),
    sa.Column('is_retirement', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE portfolios SET SCHEMA {SCHEMA};")

    op.create_table('stocks_watchlists',
    sa.Column('stock_info_code', sa.String(length=5), nullable=False),
    sa.Column('watchlist_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['stock_info_code'], ['stocks_info.code'], ),
    sa.ForeignKeyConstraint(['watchlist_id'], ['watchlists.id'], ),
    sa.PrimaryKeyConstraint('stock_info_code', 'watchlist_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE stocks_watchlists SET SCHEMA {SCHEMA};")

    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stock_info_code', sa.String(length=5), nullable=False),
    sa.Column('portfolio_id', sa.Integer(), nullable=False),
    sa.Column('shares', sa.Integer(), nullable=True),
    sa.Column('is_buy', sa.Boolean(), nullable=True),
    sa.Column('is_limit_order', sa.Boolean(), nullable=True),
    sa.Column('limit_order_id', sa.Integer(), nullable=True),
    sa.Column('transaction_price', sa.Float(), nullable=True),
    sa.Column('transaction_date', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['limit_order_id'], ['limit_orders.id'], ),
    sa.ForeignKeyConstraint(['portfolio_id'], ['portfolios.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['stock_info_code'], ['stocks_info.code'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE orders SET SCHEMA {SCHEMA};")

    op.create_table('stocks_hold',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stock_info_code', sa.String(length=5), nullable=False),
    sa.Column('portfolio_id', sa.Integer(), nullable=False),
    sa.Column('avg_price', sa.Float(), nullable=False),
    sa.Column('shares', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['portfolio_id'], ['portfolios.id'], ),
    sa.ForeignKeyConstraint(['stock_info_code'], ['stocks_info.code'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE stocks_hold SET SCHEMA {SCHEMA};")

    op.create_table('transfers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('portfolio_id', sa.Integer(), nullable=False),
    sa.Column('is_transfer_in', sa.Boolean(), nullable=True),
    sa.Column('amount', sa.Float(), nullable=True),
    sa.Column('transfer_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['portfolio_id'], ['portfolios.id'], ondelete='CASCADE' ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE transfers SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transfers')
    op.drop_table('stocks_hold')
    op.drop_table('orders')
    op.drop_table('stocks_watchlists')
    op.drop_table('portfolios')
    op.drop_table('watchlists')
    op.drop_table('users')
    op.drop_table('stocks_info')
    op.drop_table('limit_orders')
    # ### end Alembic commands ###
