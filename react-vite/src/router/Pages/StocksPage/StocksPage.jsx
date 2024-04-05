import { useDispatch, useSelector } from "react-redux";
import { getAllThunk } from "../../../redux/stock_hold";
import { useEffect } from "react";

function StocksPage() {
    const stockinfoState = useSelector(state => state.stockinfo);
    const stockinfolist_array = Object.values(stockinfoState?.Stocklists);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllThunk());
        }
        fetchData();
    }, [dispatch])

    return (
        <>
        welcome
            {/* <span>{stock.name}</span>
            <span>{stock.code}</span>
            <span>{stock.open_price}</span>
            <span>{stock.open_price}</span>
            <span>{(stock.market_cap / 1000000000).toFixed(2)}B</span>
            <span className="remove-stock-btn" onClick={removeStock}><MdClose /></span> */}
        </>
    )

}

export default StocksPage;
