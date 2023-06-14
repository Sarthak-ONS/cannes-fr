import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";

import CustomSnackbar from "../components/Snackbar/Snackbar";

const RootLayout = () => {
  const location = useLocation();

  const pathName = location.pathname;

  const [isHome, setisHome] = useState(true);

  const onSnackbarCloseHandler = ()=>{
    setisHome(false);
  };

  return (
    <div>
      {isHome && <CustomSnackbar onClose={onSnackbarCloseHandler} />}
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;
