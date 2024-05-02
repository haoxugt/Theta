import { useEffect } from "react";
// import LineChart from "../../../components/Chart/LineChart";
import LineChartTest3 from "../../../components/Chart/LineChartTest3";
import StockHoldList from "../../../components/Lists/StockHoldList/StockHoldList";
import WatchList from "../../../components/Lists/WatchList/WatchList";
import { getCurrentWatchlistsThunk } from "../../../redux/watchlist";
import { getRetirementStocksHoldThunk } from "../../../redux/stock_hold";
import { getCurrentPortfoliosThunk } from "../../../redux/portfolio";
import { getAllStockThunk } from "../../../redux/stockinfo";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi2";
import StockCardItem from "../../../components/Items/StockCardItem/StockCarditem";
import CreateWatchlistModal from "../../../components/Items/CreateWatchlistModal/CreateWatchlistModal";
import OpenModalButton from "../../../components/Items/OpenModalButton";
import { useNavigate} from 'react-router-dom'
// import CandlestickChart from "../../../components/Chart/CandlestickChart/CandlestickChart";

function HasRetirementPage() {
    const dispatch = useDispatch();
    const watchlists = useSelector(state => state.watchlist);
    const stockshold = useSelector(state => state.stockshold);
    const portfolioState = useSelector(state => state.portfolio);
    const stockinfoState = useSelector(state => state.stockinfo);
    const watchlist_array = Object.values(watchlists?.Watchlists);
    const stockshold_array = Object.values(stockshold?.Stockshold);
    const portfolio_array = Object.values(portfolioState?.Portfolios);
    const stockinfo_array = Object.values(stockinfoState?.Stocklists);
    const navigate = useNavigate();

    let current_portfolio = portfolio_array?.filter(el => el.is_retirement == true)[0];
    let amount = portfolio_array?.filter(el => el.is_retirement == true)[0]?.total_assets;
    // const open_amount = portfolio_array?.filter(el => el.is_retirement == true)[0]?.total_transfers;
    const portfolio_id = portfolio_array?.filter(el => el.is_retirement == true)[0]?.id;
    // let change = amount - open_amount;
    // change = change.toFixed(2);


    // const positiveOrNegativeClassName = (num) => {
    //     if (num >= 0) return " positive-num";
    //     else return " negative-num"
    // }


    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getCurrentWatchlistsThunk());
            await dispatch(getRetirementStocksHoldThunk());
            await dispatch(getCurrentPortfoliosThunk());
            await dispatch(getAllStockThunk())
        }
        fetchData();
        // const chart = document.querySelector('.line-chart>canvas');
        // const hoverval = document.getElementById('hoverval');
        // if (chart && hoverval) {
        //     chart.addEventListener('mouseout', () => {
        //         hoverval.innerText = `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}`;
        //     })
        // }

    }, [dispatch])

    // const figureUpdate = () => {
    //     alert("The portfolio chart updation feature will come soon")
    // }

    return (
        <div className="homepage-container">
            <div className="homepage-left-col">
                <div className="portfolio-info-container">

                    <h1 id="hoverval">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
                    </h1>

                    {/* <p className={positiveOrNegativeClassName(change)}>
                        {change >= 0 ? (<span>+{change}</span>) : (<span>{change}</span>)}

                        ({(change / amount * 100).toFixed(2) + "%"})
                    </p> */}

                </div>
                {/* <div className="portfolio-chart-container">
                    <LineChart />

                </div> */}
                <div className="portfolio-chart-container">
                    <LineChartTest3 portfolio={current_portfolio} amount={amount}/>

                </div>
                {/* <div className="time-scale-container" onClick={figureUpdate}> */}
                <div className="time-scale-container" >
                    {/* <span>1D</span>
                    <span >1W</span>
                    <span>1M</span>
                    <span>1Y</span> */}
                    <span className="week-scale">All</span>
                </div>

                <div className="cash-container">
                    <span>Buying power</span>
                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(current_portfolio.cash.toFixed(2))}</span>
                </div>

                <div className="recommand-stocks-container">
                    <div className="recommand-stocks-header">
                        <span className="recommand-stocks-title">Stocks</span>
                        <div className="stocks-daily">
                            <span className="stocks-daily-intro">Stocks recommanded for today.</span>
                            <span className='showmore-btn' onClick={() => navigate(`/stocks`)}>Show more</span>
                        </div>
                    </div>
                    <div className="recommand-stocks-list-container">
                        <div className="recommand-stock-list">
                           {stockinfo_array.slice(0,5).map(el => {
                            return (
                                <StockCardItem key={`stock-rem-${el.code}`} stock={el} />
                            )
                           })}
                        </div>

                    </div>
                </div>
                {/* <div className='chart-test'>
          <CandlestickChart />

        </div> */}

            </div>
            <div className="homepage-right-col">
                <div className="lists-container">
                    <StockHoldList stockholdlist={stockshold_array.filter(el => el.portfolio_id == portfolio_id)} />
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
                            <WatchList key={el.id} watchlist={el} />
                        )
                    })}

                </div>



            </div>
        </div>
    )
}

export default HasRetirementPage;
