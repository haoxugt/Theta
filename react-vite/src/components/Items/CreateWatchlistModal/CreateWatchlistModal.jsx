import WatchlistFormModal from "../../Forms/WatchlistForm/WatchlistFormModal";
import "./CreateWatchlist.css";

function CreateWatchlistModal() {
  const watchlist = { name: ''};

  return <WatchlistFormModal watchlist={watchlist} formType="Create List" />
}

export default CreateWatchlistModal;
