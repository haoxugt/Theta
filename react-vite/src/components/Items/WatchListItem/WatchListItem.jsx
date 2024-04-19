import { useNavigate } from 'react-router-dom';
// import SmallChart from '../../Chart/SmallChart/SmallChart';
import SmallChartTest from '../../Chart/SmallChart/SmallChartTest';
import './WatchListItem.css'

function WatchListItem({stock}) {
    const navigate = useNavigate();

    const colorCheck = () => {
        // if (stock) {
         return stock.current_price - stock.previous_close_price >= 0?
                'rgb(10,186,181)' : 'rgb(255, 80, 0)';
        // } else {
        //     return 'rgb(10,186,181)';
        // }
    }

    return (
        <div className="watchlist-row" onClick={() => navigate(`/stockinfo/${stock.code.toLowerCase()}`)}>
            <div className='watchlist-stockcode'>
               <span>{stock.code}</span>
            </div>
            <div className='watchlist-chart'>
               {stock.code && <SmallChartTest stockCode={stock.code} color={colorCheck()}/>}
            </div>
            <div className='watchlist-price'>
               <span>${stock.current_price.toFixed(2)}</span>
               <span style={{ color: colorCheck() }}>{((stock.current_price - stock.previous_close_price)/stock.previous_close_price * 100).toFixed(2)}%</span>
            </div>
        </div>
    )
}

export default WatchListItem;
