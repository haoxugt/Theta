from .db import db, environment, SCHEMA, add_prefix_for_prod

class StockInfo(db.Model):
    __tablename__ = 'stocks_info'

    if environment != "development":
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
    market_cap = db.Column(db.Float, nullable=False)
    pe_ratio = db.Column(db.Float, nullable=False)
    high_today = db.Column(db.Float, nullable=False)
    low_today = db.Column(db.Float, nullable=False)
    open_price = db.Column(db.Float, nullable=False)
    current_price = db.Column(db.Float(2), nullable=False)
    previous_close_price = db.Column(db.Float, nullable=False)
    volume = db.Column(db.Float, nullable=False)

    order_in_stockinfo = db.relationship('Order', back_populates='stockinfo_in_order')
    stockhold_in_stockinfo = db.relationship('StockHold', back_populates='stockinfo_in_stockhold')
    watchlist_in_stockinfo  = db.relationship("Watchlist", secondary="stocks_watchlists", back_populates="stockinfo_in_watchlist")


    def to_dict(self):
        if self.quote_type == 'EQUITY':
            return {
                'code': self.code,
                'name': self.name,
                'quote_type': self.quote_type,
                'long_name': self.long_name,
                'city': self.city,
                'state': self.state,
                'country': self.country,
                'employees': self.employees,
                'CEO': self.CEO,
                'industry': self.industry,
                'sector_disp': self.sector_disp,
                'high_52wk': self.high_52wk,
                'low_52wk': self.low_52wk,
                'market_cap': self.market_cap,
                'pe_ratio': self.pe_ratio,
                'high_today': self.high_today,
                'low_today': self.low_today,
                'open_price': self.open_price,
                'current_price': self.current_price,
                'previous_close_price': self.previous_close_price,
                'volume': self.volume
            }
        else:
            return {
                'code': self.code,
                'name': self.name,
                'quote_type': self.quote_type,
                'long_name': self.long_name,
                'high_52wk': self.high_52wk,
                'low_52wk': self.low_52wk,
                'market_cap': self.market_cap,
                'pe_ratio': self.pe_ratio,
                'high_today': self.high_today,
                'low_today': self.low_today,
                'open_price': self.open_price,
                'current_price': self.current_price,
                'previous_close_price': self.previous_close_price,
                'volume': self.volume
        }
