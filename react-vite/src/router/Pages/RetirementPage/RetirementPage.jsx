import { useDispatch, useSelector } from "react-redux";
import { getCurrentPortfoliosThunk } from "../../../redux/portfolio";
// import HomeLoggedIn from "./HomeLoggedIn";
// import HomeLoggedOut from "./HomeLoggedOut";
import NoRetirementPage from "./NoRetirementPage";
import HasRetirementPage from "./HasRetirementPage";

import './RetirementPage.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function RetirementPage() {
  const sessionUser = useSelector(state => state.session.user);
  const portfolioState = useSelector(state => state.portfolio);
  const portfolios = Object.values(portfolioState?.Portfolios);
  const retirementPlan = portfolios.filter(el => el.is_retirement == true);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCurrentPortfoliosThunk());

  }, [dispatch])
  // console.log(" retirementPlan 1111111111111111111111111", retirementPlan)

  if (!sessionUser) navigate("/")
  if (!retirementPlan?.length) {
    return <NoRetirementPage />
  } else {
    return <HasRetirementPage />
  }
}

export default RetirementPage;