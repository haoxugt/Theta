import { useEffect } from "react";
import LineChart from "../../../components/Chart/LineChart";
import StockHoldList from "../../../components/Lists/StockHoldList/StockHoldList";
import WatchList from "../../../components/Lists/WatchList/WatchList";
import { getCurrentWatchlistsThunk } from "../../../redux/watchlist";
import { getRetirementStocksHoldThunk } from "../../../redux/stock_hold";
import { getCurrentPortfoliosThunk } from "../../../redux/portfolio";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi2";
import CreateWatchlistModal from "../../../components/Items/CreateWatchlistModal/CreateWatchlistModal";
import OpenModalButton from "../../../components/Items/OpenModalButton";
// import CandlestickChart from "../../../components/Chart/CandlestickChart/CandlestickChart";

function HasRetirementPage() {
  const dispatch = useDispatch();
  const watchlists = useSelector(state => state.watchlist);
  const stockshold = useSelector(state => state.stockshold);
  const portfolioState = useSelector(state => state.portfolio);
  const watchlist_array = Object.values(watchlists?.Watchlists);
  const stockshold_array = Object.values(stockshold?.Stockshold);
  const portfolio_array = Object.values(portfolioState?.Portfolios);

  let current_portfolio = portfolio_array?.filter(el => el.is_retirement == true)[0];
  let amount = portfolio_array?.filter(el => el.is_retirement == true)[0]?.total_assets;
  const open_amount = portfolio_array?.filter(el => el.is_retirement == true)[0]?.total_transfers;
  const portfolio_id = portfolio_array?.filter(el => el.is_retirement == true)[0]?.id;
  let change = amount - open_amount;
  change = change.toFixed(2);
  let change2 = -change;

  const positiveOrNegativeClassName = (num) => {
    if (num >= 0) return " positive-num";
    else return " negative-num"
  }


  useEffect(() => {
     dispatch(getCurrentWatchlistsThunk());
     dispatch(getRetirementStocksHoldThunk());
     dispatch(getCurrentPortfoliosThunk());
     const chart = document.querySelector('.line-chart>canvas');
     const hoverval = document.getElementById('hoverval');
     chart.addEventListener('mouseout', () => {
         hoverval.innerText = `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}`;
     })

  }, [dispatch, amount])

  const figureUpdate = () => {
    alert("The portfolio chart will be updated")
  }

  return (
    <div className="homepage-container">
      <div className="homepage-left-col">
        <div className="portfolio-info-container">
          {/* <h1>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
          </h1> */}
          <h1 id="hoverval">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
          </h1>

          <p className={positiveOrNegativeClassName(change)}>
            {change >= 0 ? (<>+{change}</>) : (<>{change}</>)}

            ({(change / amount * 100).toFixed(2) + "%"})
          </p>

          <p className={positiveOrNegativeClassName(change2)}>
            {change2 >= 0 ? (<>+{change2}</>) : (<>{change2}</>)}

            ({(change2 / amount * 100).toFixed(2) + "%"})
          </p>
        </div>
        <div className="portfolio-chart-container">
          <LineChart />

        </div>
        <div className="time-scale-container" onClick={figureUpdate}>
            <span>1D</span>
            <span className="week-scale">1W</span>
            <span>1M</span>
            <span>1Y</span>
            <span>All</span>
        </div>

        <div className="cash-container">
            <span>Buying power</span>
            <span>${current_portfolio.cash}</span>
        </div>
        {/* <div className='chart-test'>
          <CandlestickChart />

        </div> */}

      </div>
      <div className="homepage-right-col">
        <div className="lists-container">
            <StockHoldList stockholdlist={stockshold_array.filter(el => el.portfolio_id == portfolio_id)} />
            <div className="watchlist-header">
                Lists
                <OpenModalButton
                    buttonText={<HiOutlinePlus size={20} color="grey"/>}
                    // onButtonClick={closeMenu}
                    modalComponent={<CreateWatchlistModal />}
                />
            </div>
            {watchlist_array?.map(el => {
              return (
                <WatchList key={el.id} watchlist={el}/>
              )
            })}

        </div>



      </div>
    </div>
  )
}

export default HasRetirementPage;
