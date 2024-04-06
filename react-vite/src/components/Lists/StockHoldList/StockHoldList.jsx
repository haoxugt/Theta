import { IoEllipsisHorizontal } from "react-icons/io5";
import StockHoldItem from "../../Items/StockHoldItem/StockHoldItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './StockHoldList.css'

function StockHoldList({ stockholdlist }) {

    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        document.body.click()

        setShowMenu(!showMenu);

    }

    useEffect(() => {
        if (!showMenu) return;
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    return (
        <div className="stockhold-container">
            <div className="stockhold-header">
                <span>Stocks</span> <span className="menu-btn" onClick={toggleMenu}><IoEllipsisHorizontal /></span>
                {showMenu && (
                    <div className="stocks-dropdown-menu">
                        <p onClick={() => navigate('/stocks')}>More stocks</p>
                    </div>)}
            </div>
            {stockholdlist?.map(el => {
                return (
                    <StockHoldItem key={`stockhold-${el.portfolio_id}-${el.stock_info_code}`} stock={el} />
                )
            })}
        </div>
    )
}

export default StockHoldList;
