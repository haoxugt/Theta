import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

import './ProfileButton.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    document.body.click()
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    closeMenu();
    navigate('/');
  };

  const navLinkClassName = "nav-links";

  return (
    <div className="nav-links-container-wrapper">
      {user ?
        <div className="navlinks-container">
          <button className={navLinkClassName} onClick={() => navigate('/')}>
            Investing
          </button>
          <button className={navLinkClassName} onClick={() => navigate('/retirement')}>
            Retirement
          </button>
          <button className={navLinkClassName} onClick={() => navigate('/stocks')}>
            Stocks
          </button>
          {/* <button className={navLinkClassName} onClick={() => alert('Notifications')}>
            Notifications
          </button> */}
          <button className={navLinkClassName} onClick={toggleMenu}>
            Account
          </button>
          <button className={navLinkClassName} onClick={() => navigate('/faq')}>
            Help
          </button>
          {showMenu && (
            <ul className={"profile-dropdown"} ref={ulRef}>
              {user && (
                <div>
                  <p>{user.first_name} {user.last_name}</p>
                  {/* <p onClick={() => alert('Profile page')}>Profile</p> */}
                  <p onClick={() => {navigate('/portfolios/current');closeMenu()}}>Portfolios</p>
                  <p onClick={() => {navigate('/transfer'); closeMenu()}}>Transfer</p>
                  <p onClick={logout}>Log Out</p>
                </div>
              )}
            </ul>
          )}
        </div>
        : (
          <div className="nav-btn-container">
            <button className="login-btn" onClick={() => navigate('/login')}>Log in</button>
            <button className="signup-btn" onClick={() => navigate('/signup')}>Sign up</button>
          </div>
        )
      }

    </div>
  );
}

export default ProfileButton;
