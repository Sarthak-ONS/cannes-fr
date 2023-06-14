import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";

import { RxCross2 } from "react-icons/rx";

const snackStyle = {
  backgroundColor: "var(--background-color)",
  color: "white",
  textAlign: "center",
  padding: "0.5rem",
  verticalAlign: "center",
};

const RootLayout = () => {
  const location = useLocation();

  const pathName = location.pathname;

  const isHome = pathName === "/";

  return (
    <div>
      {isHome && (
        <div style={snackStyle}>
          50% off on your first order! Shop Now <RxCross2 size={20}/>
        </div>
      )}
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;
