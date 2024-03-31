import WatchListItem from "../../Items/WatchListItem/WatchListItem";
import { FaLightbulb } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";


import './WatchList.css'

function WatchList({ watchlist }) {
    return (
        <div className="watchlist-container">

            <div className="watchlist-name">
                <div className="watchlist-name-left">
                    <FaLightbulb color="yellow" /> {watchlist.name}
                </div>
                <div className="watchlist-name-right">
                    <IoEllipsisHorizontal /> <FaAngleDown />
                </div>

            </div>
            {watchlist.stocks?.map(el => {
                return (
                    <WatchListItem key={el.code} stock={el} />
                )
            })}
        </div>
    )
}

export default WatchList;
