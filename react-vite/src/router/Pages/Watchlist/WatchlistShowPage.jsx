import { useParams } from "react-router-dom";
import { getSingleWatchlistThunk, getCurrentWatchlistsThunk } from "../../../redux/watchlist";
// import { getAllStocksHoldThunk } from "../../../redux/stock_hold";
import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi2";
// import StockHoldList from "../../../components/Lists/StockHoldList/StockHoldList";
import WatchListTitle from "../StocksPage/WatchlistTitle";
import OpenModalButton from "../../../components/Items/OpenModalButton";
// import WatchList from "../../../components/Lists/WatchList/WatchList";
import CreateWatchlistModal from "../../../components/Items/CreateWatchlistModal/CreateWatchlistModal";
import WatchlistItemInShowPage from "./WatchlistItemInShowPage";
import OpenModalMenuItem from "../../../components/Navigation/OpenModalMenuItem";
import UpdateWatchlistModal from "../../../components/Items/UpdateWatchlistModal/UpdateWatchlistModal";
import DeleteWatchlistModal from "../../../components/Items/DeleteWatchlistModal/DeleteWatchlistModal";
import { useDispatch, useSelector } from "react-redux";



import './WatchlistShowPage.css'

function WatchlistShowPage() {
    const { watchlistId } = useParams();
    const watchlistState = useSelector(state => state.watchlist)
    const watchlist = watchlistState?.watchlistShow;
    // const stockshold = useSelector(state => state.stockshold)
    const watchlist_array = Object.values(watchlistState?.Watchlists);
    // const stockshold_array = Object.values(stockshold?.Stockshold)

    const [showMenu, setShowMenu] = useState(false);
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const ulRef = useRef
    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        document.body.click()

        setShowMenu(!showMenu);

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getCurrentWatchlistsThunk());
                // await dispatch(getAllStocksHoldThunk());
                await dispatch(getSingleWatchlistThunk(watchlistId));
            } catch (e) {
                setErrors(e);
            }
        }
        fetchData();
    }, [dispatch, watchlistId])

    useEffect(() => {
        if (!showMenu) return;

        // const closeMenu = (e) => {
        //     if (ulRef.current && !ulRef.current.contains(e.target)) {
        //         setShowMenu(false);
        //     }
        // };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    if (!watchlist) return null;
    // else {
    //   if (stock.code != stockCode.toUpperCase()) return null;
    // }

    if (Object.values(errors).length) {

        return (<div>{Object.values(errors).map((el, index) => {
            return (<h2 key={`title-${index}`}>{el.message}</h2>)
        })}</div>)
    }
    return (
        <div className="homepage-container">
            <div className="homepage-left-col">
                <div className="watchlist-info-container">
                    <h1>
                        <FaLightbulb color="yellow" size={35} />
                    </h1>
                    <div className="watchlist-show-header">
                        <div className="watchlist-info-header">
                            <span>{watchlist.name}</span>
                            <span>{watchlist.stocks?.length} items</span>
                        </div>
                        <div className="edit-wahtchlist-btn" onClick={toggleMenu}>
                            <IoEllipsisHorizontal />
                        </div>

                        {showMenu && (
                            <div className="edit-wahtchlist-menu">
                                <OpenModalMenuItem
                                    itemText="Edit List"
                                    onItemClick={closeMenu}
                                    modalComponent={<UpdateWatchlistModal />}
                                />

                                <OpenModalMenuItem
                                    itemText="Delete List"
                                    onItemClick={closeMenu}
                                    modalComponent={<DeleteWatchlistModal watchlist={watchlist} />}
                                />

                            </div>)}
                    </div>
                    <div className='watchlist-list-container'>
                        <div className="watchlist-list-row-title">
                            <span className="first-col">Name</span>
                            <span>Symbol</span>
                            <span>Price</span>
                            <span>Today</span>
                            <span className="marketcap-col">Market Cap</span>
                            <span></span>
                        </div>
                        {watchlist.stocks?.map((stock) => {
                            return (
                                <div className="watchlist-list-item-row-container" key={stock.code}>
                                    <WatchlistItemInShowPage watchlist={watchlist} stock={stock} />
                                </div>
                            )
                        })}
                    </div>

                </div>


            </div>
            <div className="homepage-right-col">
                <div className="lists-container">

                    <div className="watchlist-header">
                        Lists
                        <OpenModalButton
                            buttonText={<HiOutlinePlus size={20} color="grey" />}
                            // onButtonClick={closeMenu}
                            modalComponent={<CreateWatchlistModal />}
                        />
                    </div>
                    {watchlist_array?.map(el => {
                        return (
                            // <WatchList key={el.id} watchlist={el} />
                            <WatchListTitle key={`watchlisttitle-${el.id}`} watchlist={el}/>
                        )
                    })}

                </div>



            </div>
        </div>
    )
}

export default WatchlistShowPage;
