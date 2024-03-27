import { useSelector } from "react-redux";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";

import './HomePage.css'


function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  if (sessionUser) {
    return <HomeLoggedIn />
  } else {
    return <HomeLoggedOut />
  }
}

export default HomePage;
