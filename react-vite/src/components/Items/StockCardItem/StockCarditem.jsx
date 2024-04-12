import { useNavigate } from 'react-router-dom';
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";
import './StockCardItem.css'

function StockCardItem({ stock }) {
    const navigate = useNavigate();
    const change = stock?.current_price - stock?.previous_close_price;
    const color = change >= 0 ? 'rgb(10,186,181)' : 'rgb(255, 80, 0)';
    return (
        <div className="stock-item-card-container"
            onClick={() => navigate(`/stockinfo/${stock.code.toLowerCase()}`)}>
            <div className="stock-item-card">
                <span>{stock.code}</span>
                <span className='stock-item-change'>
                    <span style={{ color: color }}>
                        ${stock.current_price.toFixed(2)}
                    </span>
                    <span style={{ color: color }}>
                        {change >= 0 ? <RxTriangleUp color='rgb(10,186,181)' size={20} /> : <RxTriangleDown color='rgb(255, 80, 0)' size={20} />}
                        {Math.abs(change / stock?.previous_close_price * 100).toFixed(2)}%
                    </span>
                </span>

            </div>
        </div>
    )
}

export default StockCardItem;
