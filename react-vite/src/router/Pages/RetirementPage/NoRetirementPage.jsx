import { useDispatch } from "react-redux";
import { createPortfolioThunk } from "../../../redux/portfolio";

function NoRetirementPage() {
    const dispatch = useDispatch()

    const createRetirementPlan = async () => {
        let portfolio = { title: "IRS", is_retirement: true }
        await dispatch(createPortfolioThunk(portfolio))
    }

    return <div className="noretirementpage-container">
        <h2>Get more for your retirement</h2>
        <p>Maxing out your IRA contributions every year.</p>
        <p>Returns aren&apos;t guaranteed</p>
        <button className="create-retirement-btn" type="submit" onClick={createRetirementPlan}>Get started</button>
    </div>
}

export default NoRetirementPage;
