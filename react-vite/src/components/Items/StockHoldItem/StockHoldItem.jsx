import { useNavigate } from 'react-router-dom';
// import SmallChart from '../../Chart/SmallChart/SmallChart';
import SmallChartTest from '../../Chart/SmallChart/SmallChartTest';
import { getAllStockThunk } from '../../../redux/stockinfo';
import './StockHoldItem.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function StockHoldItem({ stock }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const stockinfoState = useSelector(state => state.stockinfo);
    // const stockinfo = stockinfoState?.stock;
    const stocklist = stockinfoState?.Stocklists;
    const stockinfo = stocklist[stock.stock_info_code];

    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getAllStockThunk());
        }
        fetchData();
    }, [dispatch, stock.stock_info_code])

    const colorCheck = () => {
        if (stockinfo) {
         return stockinfo?.current_price - stockinfo?.previous_close_price >= 0 ?
                'rgb(10,186,181)' : 'rgb(255, 80, 0)';
        } else {
            return 'rgb(255, 255, 255)';
        }
    }

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
                <SmallChartTest stockCode={stock.stock_info_code} color={colorCheck()} />
            </div>
            <div className='stockhold-price-container'>
                {stockinfo ?
                    <span className='stockhold-price'>
                        <span>${stockinfo?.current_price?.toFixed(2)}</span>
                        <span style={{ color: colorCheck() }}>{((stockinfo?.current_price - stockinfo?.previous_close_price) / stockinfo?.previous_close_price * 100).toFixed(2)}%</span>
                    </span> :
                    <span></span>
                }
            </div>
        </div>
    )
}

export default StockHoldItem;
