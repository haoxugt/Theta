import { useState } from "react";
import { FaLightbulb } from "react-icons/fa6";

function AddStockToWatchlistItem({watchlist, stock}){
    const [checked, setChecked] = useState(watchlist.stocks.find(el => el.code == stock.code))
    // console.log("watchlist =========> ", watchlist.stocks, watchlist.stocks.includes(stock), stock)
    const handleChange = () => {
      setChecked(!checked);
    }

    return (
        <>
            <input type="checkbox"
            value={watchlist.id}
            id={"watchlist-" + watchlist.id}
            checked={checked}
            onChange={handleChange}
            /> <FaLightbulb color="yellow" size={20}/>
                {watchlist.name}
        </>
    )
}

export default AddStockToWatchlistItem;
