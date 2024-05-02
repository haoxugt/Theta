import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOrderThunk } from "../../../redux/order";
import { buyStocksHoldThunk, sellStocksHoldThunk } from "../../../redux/stock_hold";
import { buySellStockInPortfolioThunk } from "../../../redux/portfolio";
import './OrderForm.css'



function OrderForm({ portfolios, stock, isBuy, stockhold }) {
    const [isLimitOrder, setIsLimitOrder] = useState(false);
    const [shareNum, setShareNum] = useState(0)
    const [errors, setErrors] = useState({})
    const portfolios_array = Object.values(portfolios);

    const [portfolio, setPortfolio] = useState(portfolios_array.filter(el => !el.is_retirement)[0]?.id)

    const dispatch = useDispatch();

    useEffect(() => {
        const err = {};
        if (shareNum == 0) err.shareNum = "Must be greater than 0 to submit"
        setErrors(err);
    }, [shareNum])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLimitOrder==="true") {
            newFeature();
            return;
        }
        if (Object.values(errors).length) {
            alert(`The following errors were found:

          ${errors.shareNum ? "* " + errors.shareNum : ""}`);
            return null;
        }

        if (!isBuy && shareNum > getHoldShares(portfolio)) {

            alert("You cannot sell stocks more than you hold without margin")
            return null;
        }

        if (isBuy && stock.current_price * shareNum > portfolios[portfolio].cash) {
            alert("You cannot buy stocks more than your cash without margin")
            return null;
        }

        let order = {
            stock_info_code: stock.code,
            portfolio_id: portfolio,
            shares: shareNum,
            is_buy: isBuy,
            is_limit_order: isLimitOrder === "true",
            transaction_price: stock.current_price.toFixed(2)
        }

        dispatch(createOrderThunk(order))
            .then(async(res) => {
                if (isBuy) {
                    await dispatch(buyStocksHoldThunk(res));
                } else {
                    await dispatch(sellStocksHoldThunk(res));
                }
                await dispatch(buySellStockInPortfolioThunk(portfolios[portfolio], res))
                alert("You have successfully submit orders!")
                return
            })
            .catch((res) => {

                if (res.errors) {
                    setErrors(res.errors);
                    alert("Errors happens")
                }
                return;
            });



    }

    const newFeature = () => {
        alert("Feature coming soon")
    }

    const getHoldShares = (portfolio) => {

        let target_stock = Object.values(stockhold).filter(el => {
            return el.stock_info_code == stock.code && el.portfolio_id == portfolio;
        })

        if (target_stock.length) return target_stock[0].shares;
        else {
            return 0;
        }
    }


    return <form className="form-box">
        <label>
            Order Type {isLimitOrder}
            <select className="select-box"
                value={isLimitOrder}
                onChange={e => {setIsLimitOrder(e.target.value)}} >
                <option value={false}>Market Order</option>
                {/* <option value={true}>Limit Order</option> */}
            </select>
        </label>
        {isBuy ?
            (<div>
                {/* <label>
                    <span>Buy in</span>
                    <span className="share-box" onClick={newFeature}>Shares</span>
                </label> */}
                <label>
                    Shares:
                    <input min="0" type="number" value={shareNum} className="share-input"
                        onChange={e => setShareNum(e.target.value)} />
                </label>
                {/* {errors.shareNum && <span className="errors">{errors.shareNum}</span>} */}
                <label className="market-price">
                    <span>Market Price</span>
                    <span className="market-price-item"> ${stock.current_price?.toFixed(2)}</span>
                </label>
                <div className="estimate-total-price">
                    <span>Estimated Cost</span>
                    <span>${(stock.current_price * shareNum).toFixed(2)}</span>
                </div>
            </div>) : (<div>
                {/* <label>
                    <span>Sell in</span>
                    <span className="share-box" onClick={newFeature}>Shares</span>
                </label> */}
                <label>
                    Shares:
                    <input min="0" type="number" value={shareNum} className="share-input"
                        onChange={e => setShareNum(e.target.value)} />
                </label>
                {/* {errors.shareNum && <span className="errors">{errors.shareNum}</span>} */}
                <label className="market-price">
                    <span>Market Price</span>
                    <span className="market-price-item">${stock.current_price?.toFixed(2)}</span>
                </label>
                <div className="estimate-total-price">
                    <span>Estimated Credit</span>
                    <span>${(stock.current_price * shareNum).toFixed(2)}</span>
                </div>
            </div>)
        }
        <button type="submit" className="order-submit-btn" onClick={handleSubmit} >
            Submit Order
        </button>
        <div className="buy-sell-info">
            {isBuy ? <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(portfolios[portfolio]?.cash)} buying power available</span> : <span>{getHoldShares(portfolio)} Shares available</span>}
        </div>
        <label htmlFor="portfolio"></label>
        <select
            name="portfolio"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            className="portfolio-select-item"
        >
            <option value="" disabled>
                Select an portfolio...
            </option>
            {portfolios_array.map((el, index) => (
                <option key={index} value={el.id}>
                    {el.title}
                </option>
            ))}
        </select>


    </form>
}

export default OrderForm;
