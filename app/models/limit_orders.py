from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class LimitOrder(db.Model):
    __tablename__ = 'limit_orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    limit_price = db.Column(db.Float, nullable=False)
    trading_type = db.Column(db.Integer, nullable=False)
    expiration = db.Column(db.DateTime)
    is_pending = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    order_in_limitorder = db.relationship('Order', back_populates='limitorder_in_order')

    def to_dict(self):
        return {
            'id': self.id,
            'limit_price': self.limit_price,
            'trading_type': self.trading_type,
            'expiration': self.expiration,
            'is_pending': self.is_pending
        }
