import { useNavigate } from 'react-router-dom';
import SmallChart from '../../Chart/SmallChart/SmallChart';
import './WatchListItem.css'

function WatchListItem({stock}) {
    const navigate = useNavigate();
    return (
        <div className="watchlist-row" onClick={() => navigate(`/stockinfo/${stock.code.toLowerCase()}`)}>
            <div className='watchlist-stockcode'>
               <span>{stock.code}</span>
            </div>
            <div className='watchlist-chart'>
               <SmallChart />
            </div>
            <div className='watchlist-price'>
               <span>${stock.open_price.toFixed(2)}</span>
               <span>{stock.open_price}%</span>
            </div>
        </div>
    )
}

export default WatchListItem;
