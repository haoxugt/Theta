from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

stocks_watchlists = db.Table(
    "stocks_watchlists",
    db.Model.metadata,
    db.Column("stock_info_code", db.String(5), db.ForeignKey(add_prefix_for_prod('stocks_info.code')), primary_key=True),
    db.Column("watchlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("watchlists.id")), primary_key=True)
)

if environment == "production":
    stocks_watchlists.schema = SCHEMA

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user_in_watchlist = db.relationship('User', back_populates='watchlist_in_user')
    stockinfo_in_watchlist = db.relationship("StockInfo", secondary="stocks_watchlists", back_populates="watchlist_in_stockinfo")

    @property
    def stocks(self):
        return [stockinfo.to_dict() for stockinfo in self.stockinfo_in_watchlist]

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            "stocks": self.stocks
        }
