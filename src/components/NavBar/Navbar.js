import React, { useContext, useState } from "react";
import "./Navbar.css";

import logo from "../../Assets/logo.png";

import { NavLink, useLocation } from "react-router-dom";
import { BsCart, BsPerson } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import AuthContext from "../../store/auth-context";

import { HiMenuAlt4, HiX } from "react-icons/hi";

import { motion } from "framer-motion";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  const location = useLocation();

  const pathName = location.pathname;

  const isAuthPage = pathName.includes("auth");

  const [toggle, setToggle] = useState(false);

  return (
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
          {!isAuthPage && (
            <NavLink className="app__navbar-link" to={"/auth/login"}>
              <BsPerson className="icon" size={20} />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
