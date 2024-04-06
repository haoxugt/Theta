
import { FaLightbulb } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useNavigate } from "react-router-dom";




function WatchListTitle({ watchlist }) {
    const navigate = useNavigate()
    return (
        <div className="watchlist-container">

            <div className="watchlist-name" >
                <div className="watchlist-name-left" onClick={() => navigate(`/watchlists/${watchlist.id}`)}>
                    <FaLightbulb color="yellow" />
                    <span>{watchlist.name}</span>
                </div>
                <div className="watchlist-name-right">
                    <IoEllipsisHorizontal onClick={() => alert("Not sure if it is needed")}/>
                </div>

            </div>
        </div>
    )
}

export default WatchListTitle;
