import { useNavigate } from 'react-router-dom';
import './StockHoldItem.css'

function StockHoldItem({ stock }) {
    const navigate = useNavigate()
    return (
        <div className="stockhold-row"
            onClick={() => navigate(`/stockinfo/${stock.stock_info_code.toLowerCase()}`)}>
            {stock.stock_info_code} {stock.shares} Shares
        </div>
    )
}

export default StockHoldItem;
