import { useNavigate } from 'react-router-dom';
import SmallChart from '../../Chart/SmallChart/SmallChart';
import { getSingleStockThunk } from '../../../redux/stockinfo';
import './StockHoldItem.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function StockHoldItem({ stock }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const stockinfoState = useSelector(state => state.stockinfo);
    const stockinfo = stockinfoState?.stock;

    useEffect(()=>{
        dispatch(getSingleStockThunk(stock.stock_info_code))
    }, [dispatch, stock.stock_info_code])


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
                {stockinfo ?
                <>
               <span>${stockinfo?.current_price?.toFixed(2)}</span>
               <span>{((stockinfo?.current_price - stockinfo?.previous_close_price)/stockinfo?.previous_close_price * 100).toFixed(2)}%</span>
                </> :
                <></>
            }
            </div>
        </div>
    )
}

export default StockHoldItem;
