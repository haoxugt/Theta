import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteWatchlistThunk } from "../../../redux/watchlist";
import { useNavigate } from "react-router-dom";
import './DeleteWatchlistModal.css'
// import { getSpotById } from "../../../store/spot";
// import './DeleteSpotModal.css'

function DeleteWatchlistModal({ watchlist }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteWatchlistThunk(watchlist.id));
    closeModal();
    navigate('/');
  }

  return (
    <div className='delete-watchlist-container'>
      <h3>Confirm Delete</h3>
      <span>Are you sure you want to delete this watchlist?</span>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="delete-button yes-button" >Confirm</button>
        {/* <button type="submit" className="delete-button no-button" onClick={closeModal}>No (Keep Spot)</button> */}
      </form>
    </div>
  )
}

export default DeleteWatchlistModal;
