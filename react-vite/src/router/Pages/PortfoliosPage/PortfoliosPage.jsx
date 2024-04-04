import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPortfoliosThunk } from "../../../redux/portfolio";
// import { getAllThunk } from "../../../redux/stock_hold";
// import { getAllStocksHoldThunk, getRetirementStocksHoldThunk } from '../../../redux/stock_hold'

import PortfolioItem from "./PortfolioItem";

function PortfoliosPage() {
  const portfolioState = useSelector(state => state.portfolio);
  const portfolio_array = Object.values(portfolioState?.Portfolios);
  // const stockholdState = useSelector(state => state.stockshold);
  // console.log("============= stockholdState", stockholdState)
  // const stocks = Object.values(stockholdState?.Stockshold);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPortfoliosThunk());
    // dispatch(getAllThunk())
  }, [dispatch])
  // console.log("22222222222222222222", portfolio_array)

  return (
  <div className="portfoliopage-container">
    <h2>Portfolios</h2>
    {portfolio_array?.map(el => {
      return <PortfolioItem key={el.id} portfolio={el} />
    })}
  </div>
  )
}

export default PortfoliosPage;
