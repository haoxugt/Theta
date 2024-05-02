import { useDispatch } from "react-redux";
import { createPortfolioThunk } from "../../../redux/portfolio";
import { createPortfolioJSONThunk } from "../../../redux/portfolio";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";

function NoRetirementPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const createRetirementPlan = async (e) => {
        e.preventDefault();
        setErrors({})
        let portfolio = { title: "IRS", is_retirement: true }
        dispatch(createPortfolioThunk(portfolio))
            .then(async (res) => { return await dispatch(createPortfolioJSONThunk(res)) })
            .then(() => alert(`Your retirement plan account has been created.`))
            .then(navigate("/portfolios/current"))
            .catch((e) => {
                console.log(e);
                setErrors(e)
            })
    }
    if(Object.values(errors).length) {
        console.log(errors);
        return <h2>{errors.message}</h2>
    }

    return <div className="noretirementpage-container">
        <h2>Get more for your retirement</h2>
        <p>Maxing out your IRA contributions every year.</p>
        <p>Returns aren&apos;t guaranteed</p>
        <button className="create-retirement-btn" type="submit" onClick={createRetirementPlan}>Get started</button>
    </div>
}

export default NoRetirementPage;
