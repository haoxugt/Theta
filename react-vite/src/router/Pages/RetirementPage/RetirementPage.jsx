import { useDispatch, useSelector } from "react-redux";
import { getCurrentPortfoliosThunk } from "../../../redux/portfolio";
// import HomeLoggedIn from "./HomeLoggedIn";
// import HomeLoggedOut from "./HomeLoggedOut";
import NoRetirementPage from "./NoRetirementPage";
import HasRetirementPage from "./HasRetirementPage";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './RetirementPage.css'

function RetirementPage() {
  const sessionUser = useSelector(state => state.session.user);
  const portfolioState = useSelector(state => state.portfolio);
  const portfolios = Object.values(portfolioState?.Portfolios);
  const retirementPlan = portfolios.filter(el => el.is_retirement == true);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
        try {
        await dispatch(getCurrentPortfoliosThunk());
        } catch (e) {
            console.log(e)
            return;
        }
    }
    fetchData();

  }, [dispatch])

  if (!sessionUser) navigate("/")
  if (!retirementPlan?.length) {
    return <NoRetirementPage />
  } else {
    return <HasRetirementPage />
  }
}

export default RetirementPage;
