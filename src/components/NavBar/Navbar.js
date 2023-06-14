import React from "react";
import "./Navbar.css";

import { NavLink } from "react-router-dom";
import { BsCart, BsPerson } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="app__navbar">
      <div className="app__navbar-logo">
        <NavLink to={"/"}>Cannes</NavLink>
      </div>
      <div className="app__navbar-links">
        <NavLink className="app__navbar-link" to={"/cart"}>
          <BsCart className="icon" size={20} />
          <p className="app__navbar-link-text">Cart</p>
        </NavLink>
        <NavLink className="app__navbar-link" to={"/auth/login"}>
          <BsPerson className="icon" size={20} />
          <p className="app__navbar-link-text">Signup</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
