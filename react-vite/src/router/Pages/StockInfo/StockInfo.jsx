import { useParams } from "react-router-dom";
import { getSingleStockThunk } from "../../../redux/stockinfo";
import { getCurrentWatchlistsThunk } from "../../../redux/watchlist";
import { getCurrentOrdersThunk } from "../../../redux/order";
import { getAllThunk } from "../../../redux/stock_hold";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { HiMinusSm } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
// import LineChart from "../../../components/Chart/LineChart";
import OrderForm from "../../../components/Forms/OrderForm/OrderForm";
import OpenModalButton from "../../../components/Items/OpenModalButton";
import AddStockToWatchlistModal from "../../../components/Items/AddStockToWatchlistModal/AddStockToWatchlistModal";
import { getCurrentPortfoliosThunk } from "../../../redux/portfolio";
// import LineChartTest from "../../../components/Chart/LineChartTest";
import LineChartTest2 from "../../../components/Chart/LineChartTest2";
// import { IoConstructOutline } from "react-icons/io5";


import './StockInfo.css'
// import { stockTestData } from "../../../components/Chart/data";

function StockInfo() {
    const { stockCode } = useParams();
    const [isBuy, setIsBuy] = useState(true);
    // const [datalist, setDatalist] = useState([])
    const stockinfo = useSelector(state => state.stockinfo);
    const watchlistState = useSelector(state => state.watchlist);
    const portfolioState = useSelector(state => state.portfolio);
    const stockholdState = useSelector(state => state.stockshold);
    const stock = stockinfo?.stock;
    const watchlists = watchlistState?.Watchlists;
    const portfolios = portfolioState?.Portfolios;
    const stockhold = stockholdState?.Stockshold
    // const watchlist_array = Object.values(watchlistState?.Watchlists);
    const dispatch = useDispatch()
    // let datalist = []

    let c = stock.current_price;
    const pc = stock.previous_close_price;
    let change = c - pc;
    change = change.toFixed(2);


    const positiveOrNegativeClassName = (num) => {
        if (num >= 0) return " positive-num";
        else return " negative-num"
    }

    // const newFeature = () => {
    //     alert("Feature coming soon")
    // }

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSingleStockThunk(stockCode));
            await dispatch(getCurrentWatchlistsThunk());
            await dispatch(getCurrentPortfoliosThunk());
            await dispatch(getCurrentOrdersThunk());
            // dispatch(getAllStocksHoldThunk());
            await dispatch(getAllThunk());
        }
        fetchData();

    }, [dispatch, stockCode])

    // useEffect(() => {
    //     const chart = document.querySelector('.line-chart>canvas');
    //     const hoverval = document.getElementById('hoverval');
    //     const hoverval2 = document.getElementById('hoverval2');
    //     if (chart && hoverval && hoverval2) {
    //         chart.addEventListener('mouseout', () => {
    //             hoverval.innerText = `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(c)}`;
    //             hoverval2.innerText = `${change >= 0 ? +change : change}` + " " + `(${change >= 0 ? +(change / c * 100).toFixed(2) + "%" : (change / c * 100).toFixed(2) + "%"})`;
    //             hoverval2.className = change >= 0 ? " positive-num" : " negative-num";
    //             return true;
    //         })
    //     }


    // }, [c, change])

    //    if (!stock) return null;
    //     else {
    //       if (stock.code != stockCode.toUpperCase()) return null;
    //     }
    // const figureUpdate = () => {
    //     alert("The stock chart updation feature will come soon")
    // }

    if (stockCode.toUpperCase() != stock.code) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className="stockinfopage-container">
            <div className="stockinfopage-left-col">
                <div className="stockinfopage-info-container">
                    <h1>{stock.name}</h1>
                    <h1 id="hoverval">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(c)}
                    </h1>

                    <span id="hoverval2" className={positiveOrNegativeClassName(change)}>
                        {change >= 0 ? (<span>+{change}</span>) : (<span>{change}</span>)}
                        {" "}
                        ({change >= 0 ? (<span>+{(change / c * 100).toFixed(2) + "%"}</span>) : <span>{(change / c * 100).toFixed(2) + "%"}</span>})

                    </span> Today

                </div>
                {/* <div className="portfolio-chart-container">
            <LineChart id={100}/>
          </div> */}
                {/* <div>
            {datalist.length &&
            <LineChartTest datalist={datalist} />
            }
          </div> */}
                {/* <div className="portfolio-chart-container">
            <LineChartTest datalist={datalist} />
          </div> */}
                <div className="portfolio-chart-container">
                    <LineChartTest2 stockCode={stockCode} />
                </div>
                {/* <div className="time-scale-container" onClick={figureUpdate}> */}
                <div className="time-scale-container" >
                    <span style={{ color: 'rgb(10,186,181)' }}>1D</span>
                    {/* <span>1W</span>
                    <span>1M</span>
                    <span>1Y</span>
                    <span>All</span> */}
                </div>
                {stock.quote_type == 'EQUITY' ?
                    <div className="about-container">
                        <div className="about-header">
                            <span>About</span>
                        </div>

                        <div className="about-description">
                            <span className="company-description">{stock.name} is engaged in the {stock.sector_disp} in {stock.industry + " "}
                                industry. Its headquarter is located in {stock.city}, {stock.state} {stock.country}, and currently has {stock.employees + " "}
                                employees. The CEO of {stock.name} is {stock.CEO}.</span>
                        </div>
                        <div className="about-company-info">
                            <div className="about-company-info-item">
                                <span className="about-company-info-item-title">CEO</span>
                                <span className="about-company-info-item-value">{stock.CEO}</span>
                            </div>
                            <div className="about-company-info-item">
                                <span className="about-company-info-item-title">Employees</span>
                                <span className="about-company-info-item-value">{new Intl.NumberFormat('en-US').format(stock.employees)}</span>
                            </div>
                            <div className="about-company-info-item">
                                <span className="about-company-info-item-title">Headquarters</span>
                                <span className="about-company-info-item-value">{stock.city}, {stock.state}</span>
                            </div>
                            <div className="about-company-info-item">
                                <span className="about-company-info-item-title">Inductry</span>
                                <span className="about-company-info-item-value">{stock.industry}</span>
                            </div>
                        </div>

                    </div> :
                    <div className="about-container">
                        <div className="about-header">
                            <span>About</span>
                        </div>

                        <div className="about-description">
                            <span className="company-description">{stock.code} is a ETF &quot;exchange-traded funds&quot; to track a market index of listed stocks. The listed name for {stock.code} is {stock.long_name}.</span>
                        </div>

                    </div>

                }

                <div className="about-container">
                    <div className="about-header">
                        <span>Key statistics</span>
                    </div>
                    <div className="about-company-info">
                        <div className="about-company-info-item">
                            <span className="about-company-info-item-title">Market cap</span>
                            <span className="about-company-info-item-value">{(stock.market_cap / 1000000000).toFixed(2)}B</span>
                        </div>
                        <div className="about-company-info-item">
                            <span className="about-company-info-item-title">Price-Earnings ratio</span>
                            <span className="about-company-info-item-value">{stock.pe_ratio > 0 ? stock.pe_ratio.toFixed(2) : "-"}</span>
                        </div>
                        <div className="about-company-info-item">
                            <span className="about-company-info-item-title">52 Week high</span>
                            <span className="about-company-info-item-value">${stock.high_52wk.toFixed(2)}</span>
                        </div>
                        <div className="about-company-info-item">
                            <span className="about-company-info-item-title">52 Week low</span>
                            <span className="about-company-info-item-value">${stock.low_52wk.toFixed(2)}</span>
                        </div>

                        <div className="about-company-info-item">
                            <span className="about-company-info-item-title">High today</span>
                            <span className="about-company-info-item-value">${stock.high_today.toFixed(2)}</span>
                        </div>
                        <div className="about-company-info-item">
                            <span className="about-company-info-item-title">Low today</span>
                            <span className="about-company-info-item-value">${stock.low_today.toFixed(2)}</span>
                        </div>
                        <div className="about-company-info-item">
                            <span className="about-company-info-item-title">Open price</span>
                            <span className="about-company-info-item-value">${stock.open_price.toFixed(2)}</span>
                        </div>
                        <div className="about-company-info-item">
                            <span className="about-company-info-item-title">Average Volume</span>
                            <span className="about-company-info-item-value">{(stock.volume / 1000000).toFixed(2)}M</span>
                        </div>


                    </div>

                </div>



            </div>
            <div className="stockinfopage-right-col">
                <div className="orders-container">
                    <div className="order-form">
                        <div className="order-header">
                            <div className="order-header-buy"
                                onClick={() => setIsBuy(true)}
                                style={isBuy ? { color: "rgb(10,186,181)" } : { color: "white" }}>
                                Buy {stock.code}
                            </div>
                            <div className="order-header-sell"
                                onClick={() => setIsBuy(false)}
                                style={isBuy ? { color: "white" } : { color: "rgb(10,186,181)" }}>
                                Sell {stock.code}
                            </div>
                        </div>
                        {Object.values(portfolios).length ?
                            <OrderForm portfolios={portfolios} stock={stock} isBuy={isBuy} stockhold={stockhold} /> :
                            <span></span>
                        }
                    </div>

                    <div className="stock-option-addtolist-container">
                        {/* <button className="trade-option-btn" onClick={newFeature}>
                            Trade {stock.code} Options
                        </button> */}
                        <OpenModalButton
                            buttonText={<span><AiOutlinePlus /> <span>Add to Lists</span></span>}
                            // onButtonClick={closeMenu}
                            modalComponent={<AddStockToWatchlistModal watchlists={watchlists} stock={stock} />}
                        />
                        {/* <button className="addtolist-btn">
                    <AiOutlinePlus /> <span>Add to Lists</span>
                  </button> */}

                    </div>

                </div>



            </div>
        </div>
    )

}

export default StockInfo;
