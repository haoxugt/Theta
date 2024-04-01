import { useParams } from "react-router-dom";
import { getSingleWatchlistThunk, getCurrentWatchlistsThunk } from "../../../redux/watchlist";
import { getAllStocksHoldThunk } from "../../../redux/stock_hold";
import { useEffect } from "react";
import { FaLightbulb } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi2";
import StockHoldList from "../../../components/Lists/StockHoldList/StockHoldList";
import OpenModalButton from "../../../components/Items/OpenModalButton";
import WatchList from "../../../components/Lists/WatchList/WatchList";
import CreateWatchlistModal from "../../../components/Items/CreateWatchlistModal/CreateWatchlistModal";
import WatchlistItemInShowPage from "./WatchlistItemInShowPage";
import { useDispatch, useSelector } from "react-redux";

import './WatchlistShowPage.css'

function WatchlistShowPage(){
    const { watchlistId } = useParams();
    const watchlistState = useSelector(state => state.watchlist)
    const watchlist = watchlistState?.watchlistShow;
    const stockshold = useSelector(state => state.stockshold)
    const watchlist_array = Object.values(watchlistState?.Watchlists);
    const stockshold_array = Object.values(stockshold?.Stockshold)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentWatchlistsThunk());
        dispatch(getAllStocksHoldThunk());
        dispatch(getSingleWatchlistThunk(watchlistId));
    }, [dispatch, watchlistId])

    if (!watchlist) return null;
    // else {
    //   if (stock.code != stockCode.toUpperCase()) return null;
    // }
    // console.log("1111111111111111", watchlist.stocks)
    return (
      <div className="homepage-container">
      <div className="homepage-left-col">
        <div className="watchlist-info-container">
          <h1>
          <FaLightbulb color="yellow" size={35} />
          </h1>
          <div className="watchlist-show-header">
            <div className="watchlist-info-header">
              <span>{watchlist.name}</span>
              <span>{watchlist.stocks?.length} items</span>
            </div>
            <IoEllipsisHorizontal />
          </div>
          <div className='watchlist-list-container'>
              <div className="watchlist-list-row-title">
                    <span className="first-col">Name</span>
                    <span>Symbol</span>
                    <span>Price</span>
                    <span>Today</span>
                    <span className="fifth-col">Market Cap</span>
                    <span></span>
            </div>
            {watchlist.stocks?.map((stock) => {
              return (
                <div className="watchlist-list-item-row" key={stock.code}>
                  <WatchlistItemInShowPage watchlist={watchlist} stock={stock} />
                </div>
              )
            })}
          </div>

        </div>


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

export default WatchlistShowPage;
