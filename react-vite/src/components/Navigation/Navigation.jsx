import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink className="homepage-logo-sec" to="/">
          <span className="logo-title">Theta</span>
          <img className="logo" src='/images/logo_white.png' alt='logo' />
        </NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
