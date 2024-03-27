import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-container">
      <div>
        <NavLink className="homepage-logo-sec" to="/">
          <span className="logo-title">Theta</span>
          <img className="logo" src='/images/logo_white.png' alt='logo' />
        </NavLink>
      </div>

      <div className="profile-btn">
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
