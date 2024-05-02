import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPortfoliosThunk } from "../../../redux/portfolio";
import { getAllThunk } from "../../../redux/stock_hold";
import { getAllStockThunk } from "../../../redux/stockinfo";
import { FaMoneyBillWheat } from "react-icons/fa6";
// import { getAllThunk } from "../../../redux/stock_hold";
// import { getAllStocksHoldThunk, getRetirementStocksHoldThunk } from '../../../redux/stock_hold'

import PortfolioItem from "./PortfolioItem";

function PortfoliosPage() {
  const portfolioState = useSelector(state => state.portfolio);
  const portfolio_array = Object.values(portfolioState?.Portfolios);
  const stockinfoState = useSelector(state => state.stockinfo)
  const stockholdState = useSelector(state => state.stockshold)
  const stockinfo_array = Object.values(stockinfoState?.Stocklists);
  const stockhold_array = Object.values(stockholdState?.Stockshold);
  // const stockholdState = useSelector(state => state.stockshold);
  // const stocks = Object.values(stockholdState?.Stockshold);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
        await dispatch(getCurrentPortfoliosThunk());
        await dispatch(getAllThunk());
        await dispatch(getAllStockThunk());
    }
    fetchData();
    // dispatch(getAllThunk())
  }, [dispatch])


  return (
  <div className="portfoliopage-container">
    <h2><FaMoneyBillWheat color='yellow' size={25}/> <span>Portfolios</span></h2>

    {portfolio_array?.map(el => {
      return <PortfolioItem key={el.id} portfolio={el}
      stockholdlist={stockhold_array?.filter(ele => {
        return ele.portfolio_id == el.id})}
      stockinfolist={stockinfo_array?.filter(ele => {return stockhold_array?.filter(elem => elem.portfolio_id == el.id).map(elem=> elem.stock_info_code).includes(ele.code)})}/>
    })}
  </div>
  )
}

export default PortfoliosPage;
