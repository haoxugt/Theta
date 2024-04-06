import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPortfoliosThunk } from "../../../redux/portfolio";
import { transferInPortfolioThunk } from "../../../redux/portfolio";

import './TransferPage.css'

function TransferPage() {
    const portfolioState = useSelector(state => state.portfolio);
    const portfolios = portfolioState?.Portfolios;
    const portfolios_array = Object.values(portfolioState?.Portfolios)
    const [money, setMoney] = useState(0);
    const [transferType, setTransferType] = useState(1);
    const [portfolioId, setPortfolioId] = useState(portfolios_array.filter(el => !el.is_retirement)[0]?.id);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getCurrentPortfoliosThunk());
        }
        fetchData();
    }, [dispatch]);

    const transferSubmit = async (e) => {
        e.preventDefault();
        if (money == 0) return null;
        let change = money;
        if (transferType == 2) change = - money;

        if (portfolios[portfolioId].cash + change < 0) {
            alert("You don't have enought money to transfer")
            return null;
        }
        let transfer = {
            change: change
        }
        await dispatch(transferInPortfolioThunk(portfolios[portfolioId], transfer))
        alert("Transfer complete");
        return;
    }

    return <div className="transfer-page-container">
        <h1>Transfer money</h1>

        <label htmlFor="transfer"></label>
        <select
            name="transfer"
            value={transferType}
            onChange={(e) => setTransferType(e.target.value)}
        >
            <option value="" disabled>
                Select a transfer...
            </option>
            <option value={1}>Transfer In</option>
            <option value={2}>Transfer Out</option>

        </select>

        <label htmlFor="portfolio"></label>
        <select
            name="portfolio"
            value={portfolioId}
            onChange={(e) => setPortfolioId(e.target.value)}
        >
            <option value="" disabled>
                Select an portfolio...
            </option>
            {portfolios_array.map((el, index) => (
                <option key={index} value={el.id}>
                    {el.title} -- ${el.cash}
                </option>
            ))}
        </select>
        <input min="0" type="number" value={money} className="transfer-input"
            onChange={e => setMoney(e.target.value)} />
        <button className="transfer-btn" onClick={transferSubmit}>Submit</button>
    </div>
}

export default TransferPage;
