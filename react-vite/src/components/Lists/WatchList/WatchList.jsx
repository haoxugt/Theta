import WatchListItem from "../../Items/WatchListItem/WatchListItem";
import { FaLightbulb } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
// import { IoEllipsisHorizontal } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


import './WatchList.css'
import { useState } from "react";

function WatchList({ watchlist }) {
    const [showStock, setShowStock]=useState(false)
    const navigate = useNavigate()

    const toggleStock = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        document.body.click()
        setShowStock(!showStock);
        const icon = document.getElementById(`faAngle-icon-${watchlist.id}`);
        if (!showStock) {
        icon.style.transform='rotate(0.5turn)';
        icon.style.transitionDuration= '700ms';
        } else {
            icon.style.transform='rotate(0turn)';
            icon.style.transitionDuration= '700ms';
        }

    }

    // useEffect(() => {
    //     if (!showStock) return;
    //     document.addEventListener("click", closeStock);
    //     return () => document.removeEventListener("click", closeStock);
    // }, [showStock]);

    // const closeStock = () => setShowStock(false);

    return (
        <div className="watchlist-container">

            <div className="watchlist-name"  onClick={toggleStock}>
                <div className="watchlist-name-left" onClick={() => navigate(`/watchlists/${watchlist.id}`)}>
                    <FaLightbulb color="yellow" />
                    <span>{watchlist.name}</span>
                </div>
                <div className="watchlist-name-right">
                    {/* <IoEllipsisHorizontal onClick={(e) => {e.stopPropagation(); alert(`Please go to watchlist pages for editing and deleting watchlist. The functionality will be added to this button soon.`)}}/> */}
                    {/* <span>{showStock ? <FaAngleUp style={{transform: 'rotate(0.5turn)', transitionDuration: '1000ms'}}/> : <FaAngleUp style={{transform: 'rotate(0.5turn)', transitionDuration: '1000ms'}} /> }</span> */}
                    <span><FaAngleDown id={`faAngle-icon-${watchlist.id}`}/> </span>
                </div>

            </div>

            {showStock && watchlist?.stocks?.map(el => {
                return (
                    <WatchListItem key={`watchlist-${watchlist.id}-${el.code}`} stock={el} />
                )
            })}
        </div>
    )
}

export default WatchList;
