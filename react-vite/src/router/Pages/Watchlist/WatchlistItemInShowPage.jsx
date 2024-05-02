import { MdClose } from "react-icons/md";
import { removeStockInWatchlistThunk } from "../../../redux/watchlist";
import './WatchlistItemInShowPage.css'
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";
import { useDispatch } from "react-redux";

function WatchlistItemInShowPage({ watchlist, stock }) {
  const dispatch = useDispatch();

  const removeStock = async () => {
    await dispatch(removeStockInWatchlistThunk(watchlist, stock.code))
  }

  const percentageChange =  (( stock.current_price - stock.previous_close_price ) / stock.previous_close_price * 100).toFixed(2);

  return (
    <div className="watchlist-list-item-row">
      <span>{stock.name}</span>
      <span>{stock.code}</span>
      <span>${stock.current_price.toFixed(2)}</span>
      <span className="fourth-line">{percentageChange >= 0 ?
          <span><RxTriangleUp color='rgb(10,186,181)' size={20}/>{percentageChange}</span> :
          <span><RxTriangleDown color='rgb(255, 80, 0)' size={20}/>{Math.abs(percentageChange)}</span>}%
      </span>
      <span  className="marketcap-col">{(stock.market_cap/1000000000).toFixed(2)}B</span>
      <span className="remove-stock-btn" onClick={removeStock}><MdClose /></span>
    </div>
  )
}

export default WatchlistItemInShowPage;
