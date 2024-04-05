from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_info_code = db.Column(db.String(5), db.ForeignKey(add_prefix_for_prod('stocks_info.code')), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id'), ondelete="CASCADE"), nullable = False )
    shares = db.Column(db.Integer, default=0)
    is_buy = db.Column(db.Boolean, default=True)
    is_limit_order = db.Column(db.Boolean, default=False)
    limit_order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('limit_orders.id')))
    transaction_price = db.Column(db.Float)
    transaction_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    stockinfo_in_order = db.relationship('StockInfo', back_populates='order_in_stockinfo')
    portfolio_in_order = db.relationship('Portfolio', back_populates='order_in_portfolio')
    limitorder_in_order = db.relationship('LimitOrder', back_populates='order_in_limitorder')

    @property
    def order_type(self):
        if self.is_limit_order:
            return 'Limit Price Order'
        else:
            return 'Market Price Order'

    @property
    def limit_order(self):
        if self.is_limit_order:
            return self.limitorder_in_order.to_dict()
        else:
            return None


    def to_dict(self):
        return {
            'id': self.id,
            'stock_info_code': self.stock_info_code,
            'portfolio_id': self.portfolio_id,
            'shares': self.shares,
            'is_buy': self.is_buy,
            'is_limit_order': self.is_limit_order,
            'limit_order_id': self.limit_order_id,
            'transaction_price': self.transaction_price,
            'transaction_date': self.transaction_date,
            'limit_order': self.limit_order,
            'created_at': self.created_at
        }
