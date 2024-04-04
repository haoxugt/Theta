import { useEffect } from 'react'
// import { getAllThunk } from '../../../redux/stock_hold'
import { getAllThunk } from '../../../redux/stock_hold'
import { deletePortfolioThunk } from '../../../redux/portfolio'
import './PortfolioItem.css'
import { useDispatch, useSelector } from 'react-redux'

function PortfolioItem({ portfolio }) {
  const stockholdState = useSelector(state => state.stockshold);
  // console.log("============= stockholdState", stockholdState, portfolio)
  const stocks = Object.values(stockholdState?.Stockshold);
  // console.log("============= stocks", stocks)
  const dispatch = useDispatch()


  useEffect(()=> {
    dispatch(getAllThunk())
  }, [dispatch])

  const closeAccount = async () => {
    if (!portfolio.is_retirement) {
      alert("You cannot close default investing account")
    } else {
      if (portfolio.total_assets > 0) {
        alert("You need to cash out first")
      } else {
        await dispatch(deletePortfolioThunk(portfolio.id))
      }
    }

  }

  return (
    <div className="portfolio-info_container">
      <div className="portfolio-header">
        <span>Portfolio: </span>
        <span>{portfolio.title}</span>
        <span>total: ${portfolio.total_assets}</span>
        <span className="closeaccount-btn" onClick={closeAccount}>Close this account</span>
      </div>
      <div className="portfolio-details-container">
        <div className="portfolio-details-header">
           <span>Symbol</span>
           <span>Description</span>
           <span>Quantity</span>
           <span>Price</span>
           <span>Unit Cost</span>
           <span>Day&apos;`s $ Chg</span>
           <span>Day&apos;`s % Chg</span>
        </div>
        <div className="portfolio-details-stockhold">
           {stocks.filter(el => el.portfolio_id == portfolio.id).map(el => {
            return (
            <>
            <span>{el.stock_info_code}</span>
            <span></span>
            <span>{el.shares}</span>
            <span></span>
            <span>${el.avg_price}</span>
            <span></span>
            <span></span>
            </>
            )
           })}
        </div>

      </div>
    </div>
  )
}

export default PortfolioItem;
