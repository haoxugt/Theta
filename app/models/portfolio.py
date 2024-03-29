from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    cash = db.Column(db.Float, default=0.0)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    open_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user_in_portfolio = db.relationship('User', back_populates='portfolio_in_user')
    order_in_portfolio = db.relationship('Order', back_populates='portfolio_in_order')
    stockhold_in_portfolio = db.relationship('StockHold', back_populates='portfolio_in_stockhold')

    @property
    def user(self):
        return {
            'id': self.user_in_portfolio.id,
            'first_name': self.user_in_portfolio.first_name,
            'last_name': self.user_in_portfolio.last_name
        }

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'cash': self.cash,
            'user': self.user,
            'open_date': self.open_date
        }
