import { useState } from "react";
import { FaLightbulb } from "react-icons/fa6";

function AddStockToWatchlistItem({ watchlist, stock }) {
    const [checked, setChecked] = useState(watchlist.stocks.find(el => el.code == stock.code))
    const handleChange = () => {
        setChecked(!checked);
    }

    return (
        <div className="checkbox-container">
            <input type="checkbox"
                value={watchlist.id}
                id={"watchlist-" + watchlist.id}
                checked={checked}
                onChange={handleChange}
                className="watchlist-checkbox"
            />
            <span className="bulb-icon-container"><FaLightbulb color="yellow" size={20} /></span>
            <span>{watchlist.name}</span>
        </div>
    )
}

export default AddStockToWatchlistItem;
