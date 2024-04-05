import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";
import { useState } from "react";

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const [src, setSrc] = useState('/images/logo_white.png')

    const changeToBlueLogo = () =>{
        setSrc('/images/logo_blue.png');
    }

    const changeToWhiteLogo = () => {
        setSrc('/images/logo_white.png');
    }

  return (
    <div className="nav-container">
      <div>
        <NavLink className="homepage-logo-sec" to="/">
          {!sessionUser && <span className="logo-title">Theta</span>}
          <img className="logo" src={src} alt='logo' onMouseOver={changeToBlueLogo} onMouseOut={changeToWhiteLogo}/>
        </NavLink>
      </div>

      <div className="profile-btn">
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
