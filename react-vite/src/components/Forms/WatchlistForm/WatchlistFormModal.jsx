import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa6";
import { useModal } from "../../../context/Modal";
import { createWatchlistThunk, updateWatchlistThunk } from "../../../redux/watchlist";

function WatchlistFormModal({ watchlist, formType }) {
  const [name, setName] = useState(watchlist?.name);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    watchlist = {
      ...watchlist,
      name
    }

    if (formType === 'Update List') {
      dispatch(updateWatchlistThunk(watchlist))
      .then(() => closeModal())
      return
    } else if (formType === 'Create List') {

      dispatch(createWatchlistThunk(watchlist))
      .then(() => closeModal())
      .catch( async(res) => {
        setErrors({errors: res.statusText})
      })

    }
  }

  useEffect(() => {
    const err = {};

    if (name.length === 0 ) err.name = "List name is required";
    setErrors(err);
  }, [name]);

  return (
    <div className="create-watchlist-container">
      <div className="create-watchlist-header">
        <h1>Create list</h1>{errors.errors && <p>{errors.errors}</p>}
        <button className="close-btn" onClick={closeModal}><MdClose size={30} /></button>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="create-watchlist-label">
          <div>
            <FaLightbulb color="yellow" size={22}/>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="List Name"
            required
          />
        </label>
        {/* {errors.email && <p>{errors.email}</p>} */}
        <div className="create-watchlist-btn-container">
          <button type="submit" className="cancel-button create-watchlist-btn" onClick={closeModal}>Cancel</button>
          <button type="submit" className="create-button create-watchlist-btn">{formType}</button>

        </div>
      </form>
    </div>
  );
}

export default WatchlistFormModal;
