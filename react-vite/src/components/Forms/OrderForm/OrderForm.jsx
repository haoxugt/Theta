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
    console.log(" portfolios =============> ", portfolios)
    // console.log(" print id ==============> ", portfolios_array.filter(el => !el.is_retirement)[0]?.id)
    const [portfolio, setPortfolio] = useState(portfolios_array.filter(el => !el.is_retirement)[0]?.id)
    console.log(" print portfolio =================>", portfolio)
    const dispatch = useDispatch();

    useEffect(() => {
        const err = {};
        if (shareNum == 0) err.shareNum = "Must be greater than 0 to submit"
        setErrors(err);
    }, [shareNum])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert("Test")
        if (isLimitOrder) {
            newFeature();
            return;
        }
        if (Object.values(errors).length) {
            alert(`The following errors were found:

          ${errors.shareNum ? "* " + errors.shareNum : ""}`);
            return null;
        }

        if (!isBuy && shareNum > getHoldShares()) {
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
            is_limit_order: isLimitOrder,
            transaction_price: stock.current_price
        }

        dispatch(createOrderThunk(order))
            .then((res) => {
                if (isBuy) {
                    dispatch(buyStocksHoldThunk(res));
                } else {
                    dispatch(sellStocksHoldThunk(res));
                }
                // console.log("5555555555555555555555",portfolios, portfolio)
                dispatch(buySellStockInPortfolioThunk(portfolios[portfolio], res))
                alert("You have successfully submit orders!")
                return
            })
            .catch((res) => {
                // console.log("res errors =======>", res)
                if (res.errors) {
                    setErrors(res.errors);
                    alert("Errors happens")
                }
                return;
            });


        // console.log("res =============> ", res)
    }

    const newFeature = () => {
        alert("Feature coming soon")
    }

    const getHoldShares = () => {
        // console.log("66666666666666666666666666666666",stockhold,stock.code, portfolio)
        let target_stock = Object.values(stockhold).filter(el => {
            return el.stock_info_code == stock.code && el.portfolio_id == portfolio;
        })
        // console.log("77777777777777777777777", target_stock)
        if (target_stock.length) return target_stock[0].shares;
        else return 0;
    }


    return <form onSubmit={handleSubmit} className="form-box">
        <label>
            Order Type
            <select className="select-box"
                value={isLimitOrder}
                onChange={e => setIsLimitOrder(e.target.value)} >
                <option value={false}>Market Order</option>
                <option value={true}>Limit Order</option>
            </select>
        </label>
        {isBuy ?
            (<>
                <label>
                    <span>Buy in</span>
                    <span className="share-box" onClick={newFeature}>Shares</span>
                </label>
                <label>
                    Shares:
                    <input min="0" type="number" value={shareNum} className="share-input"
                        onChange={e => setShareNum(e.target.value)} />
                </label>
                {/* {errors.shareNum && <span className="errors">{errors.shareNum}</span>} */}
                <label className="market-price">
                    <span>Market Price</span>
                    <span className="market-price-item"> ${stock.current_price}</span>
                </label>
                <div className="estimate-total-price">
                    <span>Estimated Cost</span>
                    <span>${(stock.current_price * shareNum).toFixed(2)}</span>
                </div>
            </>) : (<>
                <label>
                    <span>Sell in</span>
                    <span className="share-box" onClick={newFeature}>Shares</span>
                </label>
                <label>
                    Shares:
                    <input min="0" type="number" value={shareNum} className="share-input"
                        onChange={e => setShareNum(e.target.value)} />
                </label>
                {/* {errors.shareNum && <span className="errors">{errors.shareNum}</span>} */}
                <label className="market-price">
                    <span>Market Price</span>
                    <span className="market-price-item">${stock.current_price}</span>
                </label>
                <div className="estimate-total-price">
                    <span>Estimated Credit</span>
                    <span>${(stock.current_price * shareNum).toFixed(2)}</span>
                </div>
            </>)
        }
        <button type="submit" className="order-submit-btn">
            Submit Order
        </button>
        <div className="buy-sell-info">
            {/* {console.log("print ===================>", portfolio, portfolios[portfolio])} */}
            {isBuy ? <>${portfolios[portfolio]?.cash} buying power </> : <>{getHoldShares()} Shares available</>}
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
