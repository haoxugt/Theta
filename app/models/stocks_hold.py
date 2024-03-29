from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class StockHold(db.Model):
    __tablename__ = 'stocks_hold'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_info_code = db.Column(db.String(5), db.ForeignKey(add_prefix_for_prod('stocks_info.code')), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable = False )
    avg_price = db.Column(db.Float, nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    stockinfo_in_stockhold = db.relationship('StockInfo', back_populates='stockhold_in_stockinfo')
    portfolio_in_stockhold = db.relationship('Portfolio', back_populates='stockhold_in_portfolio')


    def to_dict(self):
        return {
            'id': self.id,
            'stock_info_code': self.stock_info_code,
            'portfolio_id': self.portfolio_id,
            'avg_price': self.avg_price,
            'shares': self.shares
        }
