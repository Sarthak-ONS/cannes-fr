import React, { useContext, useState } from "react";
import "./Navbar.css";

import logo from "../../Assets/logo.png";

import { NavLink, useLocation } from "react-router-dom";
import { BsCart, BsPerson } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

import CustomSnackbar from "../Snackbar/Snackbar";
import AuthContext from "../../store/auth-context";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  console.log(authCtx, "This is the data in Navbr");

  const location = useLocation();

  const pathName = location.pathname;

  const isAuthPage = pathName.includes("auth");

  return (
    <div className="navbar__container">
      {/* {isHome && <CustomSnackbar onClose={onSnackbarCloseHandler} />} */}
      <div className="app__navbar">
        <div className="app__navbar-logo">
          <NavLink to={"/"}>
            <img alt="Brand Logo" src={logo}></img>
          </NavLink>
          <div className="app__navbar-name">
            Hello, {authCtx.name.split(" ")[0]}
          </div>
        </div>
        <div className="app__navbar-links">
          {!isAuthPage && (
            <input className="search-input" placeholder="Search" />
          )}
          {!isAuthPage && (
            <NavLink className="app__navbar-link" to={"/cart"}>
              <BsCart className="icon" size={20} />
              {/* <p className="app__navbar-link-text">Cart</p> */}
            </NavLink>
          )}
          {!isAuthPage && (
            <NavLink className="app__navbar-link" to={"/cart"}>
              <AiOutlineHeart className="icon" size={20} />
              {/* <p className="app__navbar-link-text">Cart</p> */}
            </NavLink>
          )}
          {!isAuthPage && (
            <NavLink className="app__navbar-link" to={"/auth/login"}>
              <BsPerson className="icon" size={20} />
              {/* <p className="app__navbar-link-text">Login</p> */}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
