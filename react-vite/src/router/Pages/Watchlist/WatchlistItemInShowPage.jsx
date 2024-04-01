import { MdClose } from "react-icons/md";
import { removeStockInWatchlistThunk } from "../../../redux/watchlist";
import './WatchlistItemInShowPage.css'
import { useDispatch } from "react-redux";

function WatchlistItemInShowPage({ watchlist, stock }) {
  const dispatch = useDispatch();

  const removeStock = async () => {
    // console.log("test============>",watchlist.id, stock.code)
    await dispatch(removeStockInWatchlistThunk(watchlist, stock.code))
  }
  return (
    <>
      <span>{stock.name}</span>
      <span>{stock.code}</span>
      <span>{stock.open_price}</span>
      <span>{stock.open_price}</span>
      <span>{(stock.market_cap/1000000000).toFixed(2)}B</span>
      <span className="remove-stock-btn" onClick={removeStock}><MdClose /></span>
    </>
  )
}

export default WatchlistItemInShowPage;
