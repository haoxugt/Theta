from .db import db, environment, SCHEMA, add_prefix_for_prod

class StockInfo(db.Model):
    __tablename__ = 'stocks_info'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    code = db.Column(db.String(5), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quote_type = db.Column(db.String(40), nullable=False)
    long_name = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    country = db.Column(db.String(50))
    employees = db.Column(db.Integer)
    CEO = db.Column(db.String(50))
    industry = db.Column(db.String(50))
    sector_disp = db.Column(db.String(50))
    high_52wk = db.Column(db.Float, nullable=False)
    low_52wk = db.Column(db.Float, nullable=False)
    market_cap = db.Column(db.Float)
    pe_ratio = db.Column(db.Float, nullable=False)
    high_today = db.Column(db.Float, nullable=False)
    low_today = db.Column(db.Float, nullable=False)
    open_price = db.Column(db.Float, nullable=False)
    volume = db.Column(db.Float, nullable=False)

    order_in_stockinfo = db.relationship('Order', back_populates='stockinfo_in_order')
    stockhold_in_stockinfo = db.relationship('StockHold', back_populates='stockinfo_in_stockhold')
    watchlist_in_stockinfo  = db.relationship("Watchlist", secondary="stocks_watchlists", back_populates="stockinfo_in_watchlist")


    def to_dict(self):
        return {
            'code': self.code,
            'name': self.name,
            'long_name': self.long_name,
            'user': self.user,
            'open_date': self.open_date
        }
