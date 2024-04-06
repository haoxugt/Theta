import { useParams } from "react-router-dom";
import WatchlistFormModal from "../../Forms/WatchlistForm/WatchlistFormModal";
import { useDispatch, useSelector } from "react-redux";
import { getSingleWatchlistThunk } from "../../../redux/watchlist";
import { useEffect } from "react";
// import "./CreateWatchlist.css";

function UpdateWatchlistModal() {
    const { watchlistId } = useParams();
    const watchlistState = useSelector(state => state.watchlist);
    const watchlist = watchlistState?.watchlistShow;
    const dispatch = useDispatch();

    // const watchlist = { name: ''};
    useEffect(() => {
        const fetchData = async () => {
            dispatch(getSingleWatchlistThunk(watchlistId))
        }
        fetchData()
    }, [dispatch, watchlistId])

    return <WatchlistFormModal watchlist={watchlist} formType="Update List" />
}

export default UpdateWatchlistModal;
