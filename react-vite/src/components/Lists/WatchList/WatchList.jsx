import WatchListItem from "../../Items/WatchListItem/WatchListItem";
import { FaLightbulb } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


import './WatchList.css'

function WatchList({ watchlist }) {
    const navigate = useNavigate()
    return (
        <div className="watchlist-container">

            <div className="watchlist-name" >
                <div className="watchlist-name-left" onClick={() => navigate(`/watchlists/${watchlist.id}`)}>
                    <FaLightbulb color="yellow" />
                    <span>{watchlist.name}</span>
                </div>
                <div className="watchlist-name-right">
                    <IoEllipsisHorizontal /> <FaAngleDown />
                </div>

            </div>
            {/* {console.log("test watchlsit ============", watchlist, watchlist?.stocks)} */}
            {watchlist?.stocks?.map(el => {
                return (
                    <WatchListItem key={el.code} stock={el} />
                )
            })}
        </div>
    )
}

export default WatchList;
