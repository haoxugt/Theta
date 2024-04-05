// import { useEffect } from 'react'
// import { getAllThunk } from '../../../redux/stock_hold'
// import { getAllThunk } from '../../../redux/stock_hold'
import { deletePortfolioThunk } from '../../../redux/portfolio'
import './PortfolioItem.css'
import { useDispatch } from 'react-redux'

function PortfolioItem({ portfolio, stockholdlist, stockinfolist }) {
    //   const stockholdState = useSelector(state => state.stockshold);
    // console.log("============= stockholdState", stockholdState, portfolio)
    //   const stocks = Object.values(stockholdState?.Stockshold);
    // console.log("============= stocks", stocks)
    const dispatch = useDispatch()


    //   useEffect(()=> {
    //     dispatch(getAllThunk())
    //   }, [dispatch])

    // console.log("00000000000000000000000000000", stockholdlist, stockinfolist)

    const closeAccount = async () => {
        if (!portfolio.is_retirement) {
            alert("You cannot close default investing account")
        } else {
            if (portfolio.total_assets > 0) {
                alert("You need to cash out first")
            } else {
                await dispatch(deletePortfolioThunk(portfolio.id));
                alert("You successfully delete your retirement account.")
            }
        }

    }


    return (
        <div className="portfolio-detail-container">
            <div className="portfolio-header">
                <span>Portfolio: {portfolio.title}</span>

                <span>Total: ${(portfolio.cash + stockholdlist?.reduce((acc, curr) => {
                    return acc + stockinfolist?.find(el => el.code == curr.stock_info_code)?.current_price * curr?.shares;
                }, 0)).toFixed(2)}</span>
                <span>Cash : ${portfolio.cash.toFixed(2)}</span>
                <span className="closeaccount-btn" onClick={closeAccount}>Close account</span>
            </div>
            <div className="portfolio-details-container">
                <div className="portfolio-details-header">
                    <span className='first-line-stockhold-row'>Symbol</span>
                    <span className='second-line-stockhold-row'>Description</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Unit Cost</span>
                    <span>Value</span>
                    <span>Day&apos;s $ Chg</span>
                    <span>Day&apos;s % Chg</span>
                    <span>Total $ Chg</span>
                    <span>Total % Chg</span>
                </div>
                <div className="portfolio-details-stockhold">
                    {stockholdlist?.filter(el => el.portfolio_id == portfolio.id).map(el => {
                        const stockinfo = stockinfolist?.find(ele => ele.code == el.stock_info_code)
                        return (
                            <div className='stockholdlist-row' key={`${el.stock_info_code}`}>
                                {stockinfo && <>
                                    <span style={{ color: 'rgb(10,186,181)' }} className='first-line-stockhold-row'>{el.stock_info_code}</span>
                                    <span className='second-line-stockhold-row'>{stockinfo?.name}</span>
                                    <span className='third-line-stockhold-row'>{el.shares}</span>
                                    <span>${stockinfo?.current_price}</span>
                                    <span>${el.avg_price}</span>
                                    <span>${(stockinfo?.current_price * el.shares).toFixed(2)} </span>
                                    <span>{(stockinfo?.current_price - stockinfo?.previous_close_price).toFixed(2)} </span>
                                    <span>{((stockinfo?.current_price - stockinfo?.previous_close_price) / stockinfo?.previous_close_price * 100).toFixed(2)}%</span>
                                    <span>{((stockinfo?.current_price - el.avg_price) * el.shares).toFixed(2)}</span>
                                    <span>{((stockinfo?.current_price - el.avg_price) / el.avg_price * 100).toFixed(2)}</span>
                                </>}
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default PortfolioItem;
