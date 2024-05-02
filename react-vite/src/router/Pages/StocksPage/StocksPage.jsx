import { useDispatch, useSelector } from "react-redux";
// import { getAllThunk } from "../../../redux/stock_hold";
import { getCurrentWatchlistsThunk } from "../../../redux/watchlist";
// import { getAllStocksHoldThunk } from "../../../redux/stock_hold";
import { getAllStockThunk } from "../../../redux/stockinfo";
import StocklistItemInShowPage from "./StocklistItemInShowPage";
// import StockHoldList from "../../../components/Lists/StockHoldList/StockHoldList";
import OpenModalButton from "../../../components/Items/OpenModalButton";
// import WatchList from "../../../components/Lists/WatchList/WatchList";
import WatchListTitle from "./WatchlistTitle";
import { HiOutlinePlus } from "react-icons/hi2";
import CreateWatchlistModal from "../../../components/Items/CreateWatchlistModal/CreateWatchlistModal";
import { useEffect } from "react";
import { AiOutlineStock } from "react-icons/ai";

import './StocksPage.css'

function StocksPage() {
    const stockinfoState = useSelector(state => state.stockinfo);
    const watchlistState = useSelector(state => state.watchlist)
    // const stockshold = useSelector(state => state.stockshold)
    // const watchlist = watchlistState?.watchlistShow;
    const watchlist_array = Object.values(watchlistState?.Watchlists);
    const stockinfolist_array = Object.values(stockinfoState?.Stocklists);
    // const stockshold_array = Object.values(stockshold?.Stockshold)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            // await dispatch(getAllThunk());
            await dispatch(getCurrentWatchlistsThunk())
            await dispatch(getAllStockThunk())
        }
        fetchData();
    }, [dispatch])

    return (
<div className="homepage-container">
      <div className="homepage-left-col">
        <div className="stocklist-info-container">
          <h1>
            <AiOutlineStock color="yellow" size={35} />
            <span>Recommended Stocks</span>
          </h1>

          <div className='stocklist-list-container'>
              <div className="stocklist-list-row-title">
                    <span className="first-col">Name</span>
                    <span>Symbol</span>
                    <span>Price</span>
                    <span>Today</span>
                    <span className="marketcap-col">Market Cap</span>
            </div>
            {stockinfolist_array.sort((a, b)=> { return a.code > b.code ? 1 : -1}).map((stock) => {
              return (
                  <StocklistItemInShowPage stock={stock} key={`stocklist-${stock.code}`}/>
              )
            })}
          </div>

        </div>


      </div>
      <div className="homepage-right-col">
        <div className="lists-container">
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
                <WatchListTitle key={`watchlisttitle-${el.id}`} watchlist={el}/>
              )
            })}

        </div>



      </div>
    </div>
    )

}

export default StocksPage;
