import { useParams } from "react-router-dom";
import { getSingleStockThunk } from "../../../redux/stockinfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function StockInfo(){
    const { stockCode } = useParams();
    const stockinfo = useSelector(state => state.stockinfo)
    const stock = stockinfo?.stock;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleStockThunk(stockCode));
    }, [dispatch, stockCode])

    if (!stock) return null;
    else {
      if (stock.code != stockCode.toUpperCase()) return null;
    }

    return <h1>stock info: {stock.long_name} {stock.industry}</h1>
}

export default StockInfo;
