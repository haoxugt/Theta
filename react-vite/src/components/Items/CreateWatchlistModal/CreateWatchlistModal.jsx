import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { FaLightbulb } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "./CreateWatchlist.css";

function CreateWatchlistModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const serverResponse = await dispatch(
    //   thunkLogin({
    //     email,
    //     password,
    //   })
    // );

    // if (serverResponse) {
    //   setErrors(serverResponse);
    // } else {
    //   closeModal();
    // }
    closeModal();
  };

  return (
    <div className="create-watchlist-container">
      <div className="create-watchlist-header">
        <h1>Create list</h1>
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
          <button type="submit" className="create-button create-watchlist-btn">Create List</button>

        </div>
      </form>
    </div>
  );
}

export default CreateWatchlistModal;
