import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";

import logo from "../../Assets/logo.png";

import { NavLink, useLocation } from "react-router-dom";
import { BsCart, BsPerson } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import AuthContext from "../../store/auth-context";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  const location = useLocation();

  const pathName = location.pathname;

  const isAuthPage = pathName.includes("auth");

  const [toggleMenu, setToggleMenu] = useState(false);

  const menuRef = useRef();

  const toggleClickHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setToggleMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar__container">
        {/* {isHome && <CustomSnackbar onClose={onSnackbarCloseHandler} />} */}
        <div className="app__navbar">
          <div className="app__navbar-logo">
            <NavLink to={"/"}>
              <img alt="Brand Logo" src={logo}></img>
            </NavLink>
            {authCtx.name.split(" ")[0] && (
              <div className="app__navbar-name">
                Hello, {authCtx.name.split(" ")[0]}
              </div>
            )}
          </div>
          <div className="app__navbar-links">
            {!isAuthPage && (
              <input className="search-input" placeholder="Search" />
            )}
            {!isAuthPage && (
              <NavLink className="app__navbar-link" to={"/cart"}>
                <BsCart className="icon" size={20} />
              </NavLink>
            )}
            {!isAuthPage && (
              <NavLink className="app__navbar-link" to={"/cart"}>
                <AiOutlineHeart className="icon" size={20} />
              </NavLink>
            )}
            {!isAuthPage && !authCtx._id && (
              <NavLink className="app__navbar-link" to={"/auth/login"}>
                <BsPerson className="icon" size={20} />
              </NavLink>
            )}
            {authCtx._id && (
              <div className="app__navbar-link ">
                <div className="profile-icon" onClick={toggleClickHandler}>
                  {authCtx.name.slice(0, 1)}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {toggleMenu && (
        <div
          ref={menuRef}
          className={`toggle-menu ${toggleMenu ? "open" : ""}`}
        >
          <ul>
            <li className="toggle-menu__name" key={0}>
              {authCtx.name}
            </li>
            <li className="toggle-menu__email" key={1}>
              {authCtx.email}
            </li>
            <li key={2}>Orders</li>
            <li key={3}>Wishlist</li>
            <form
              method="GET"
              action={`${`${process.env.REACT_APP_BACKEND_HOST}/auth/logout`}`}
            >
              <li key={3}>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("expiration");
                  }}
                  type="submit"
                >
                  Logout
                </button>
              </li>
            </form>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
