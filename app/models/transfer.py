from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transfer(db.Model):
    __tablename__ = 'transfers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id'), ondelete="CASCADE"), nullable = False )
    is_transfer_in = db.Column(db.Boolean, default=True)
    amount = db.Column(db.Float, default=0.0)
    transfer_date = db.Column(db.DateTime, nullable = False)

    portfolio_in_transfer = db.relationship('Portfolio', back_populates='transfer_in_portfolio')

    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'is_transfer_in': self.is_transfer_in,
            'amount': self.amount
        }
