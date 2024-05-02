
import { useModal } from "../../../context/Modal";
import { MdClose } from "react-icons/md";
import AddStockToWatchlistItem from "../AddStockToWatchlistItem/AddStockToWatchlistItem";
import { addStockToWatchlistThunk, removeStockInWatchlistThunk } from "../../../redux/watchlist";
import { useDispatch } from "react-redux";
import "./AddStockToWatchlist.css";

function AddStockToWatchlistModal({ watchlists, stock }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const watchlist_array = Object.values(watchlists);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkboxs = document.querySelectorAll('.addstocktowatchlist-from label input');

    for (let i = 0; i< checkboxs.length; i++) {
      let watchlist = watchlists[checkboxs[i].id.slice(10)];

      if (checkboxs[i].checked) {
        if (!watchlist.stocks.find(el => el.code == stock.code)) {
           await dispatch(addStockToWatchlistThunk(watchlist, stock))
        }
      } else {
        if (watchlist.stocks.find(el => el.code == stock.code)) {
           await dispatch(removeStockInWatchlistThunk(watchlist, stock.code))
        }
      }
    }
    closeModal();
  }

  return (
    <div className="addstocktowatchlist-container">
      <div className="addstocktowatchlist-header">
        <h1>Add {stock.code} to Your Lists</h1>
        <button className="close-btn" onClick={closeModal}><MdClose size={30} /></button>
      </div>

      <div className="addstocktowatchlist-list">
        <form className="addstocktowatchlist-from" onSubmit={handleSubmit}>
          {watchlist_array.map((el, index) => {
            return (
              <label key={index}>
                <AddStockToWatchlistItem watchlist={el} stock={stock} />
              </label>
            )
          })}
          <button type="submit" className="addstocktowatchlist-btn">Save Changes</button>
        </form>
      </div>
    </div>
    // <h1>welcome</h1>
  )
}

export default AddStockToWatchlistModal;
