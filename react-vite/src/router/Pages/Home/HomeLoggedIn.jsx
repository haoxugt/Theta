import { useEffect } from "react";
import LineChart from "../../../components/Chart/LineChart";
import StockHoldList from "../../../components/Lists/StockHoldList/StockHoldList";
import WatchList from "../../../components/Lists/WatchList/WatchList";
import { getCurrentWatchlistsThunk } from "../../../redux/watchlist";
import { getAllStocksHoldThunk } from "../../../redux/stock_hold";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi2";
import CreateWatchlistModal from "../../../components/Items/CreateWatchlistModal/CreateWatchlistModal";
import OpenModalButton from "../../../components/Items/OpenModalButton";
// import CandlestickChart from "../../../components/Chart/CandlestickChart/CandlestickChart";

function HomeLoggedIn() {
  const dispatch = useDispatch();
  const watchlists = useSelector(state => state.watchlist);
  const stockshold = useSelector(state => state.stockshold)
  const watchlist_array = Object.values(watchlists?.Watchlists);
  const stockshold_array = Object.values(stockshold?.Stockshold)


  let amount = 123456.78;
  const open_amount = 123000;
  let change = amount - open_amount;
  change = change.toFixed(2);
  let change2 = -change;

  const positiveOrNegativeClassName = (num) => {
    if (num >= 0) return " positive-num";
    else return " negative-num"
  }


  useEffect(() => {
     dispatch(getCurrentWatchlistsThunk());
     dispatch(getAllStocksHoldThunk());
     const chart = document.querySelector('.line-chart>canvas');
     const hoverval = document.getElementById('hoverval');
     chart.addEventListener('mouseout', () => {
         hoverval.innerText = `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}`;
     })

  }, [dispatch, amount])



  return (
    <div className="homepage-container">
      <div className="homepage-left-col">
        <div className="portfolio-info-container">
          <h1>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
          </h1>
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
        {/* <div className='chart-test'>
          <CandlestickChart />

        </div> */}

      </div>
      <div className="homepage-right-col">
        <div className="lists-container">
            <StockHoldList stockholdlist={stockshold_array} />
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

export default HomeLoggedIn;
