import WatchListItem from "../../Items/WatchListItem/WatchListItem";
import { FaLightbulb } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";

function WatchList({watchlist}) {
    return (
    <div className="watchlist-container">
        <div className="watchlist-header">
        <FaLightbulb color="yellow" /> {watchlist.name} <IoEllipsisHorizontal /> <FaAngleDown />
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
