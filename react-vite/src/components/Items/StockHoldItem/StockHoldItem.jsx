import { useNavigate } from 'react-router-dom';
import SmallChart from '../../Chart/SmallChart/SmallChart';
import './StockHoldItem.css'

function StockHoldItem({ stock }) {
    const navigate = useNavigate()
    return (
        <div className="stockhold-row"
            onClick={() => navigate(`/stockinfo/${stock.stock_info_code.toLowerCase()}`)}>
            <div className='stockhold-stockcode-shares'>
                <span className='stockhold-stockcode'>
                    {stock.stock_info_code}
                </span>
                <span className='stockhold-stockshares'>
                    {stock.shares} shares
                </span>
            </div>
            <div className='stockhold-chart'>
                <SmallChart />
            </div>
            <div className='stockhold-price'>
               <span>${stock.avg_price.toFixed(2)}</span>
               <span>{stock.avg_price}%</span>
            </div>
        </div>
    )
}

export default StockHoldItem;
