import React, { useState, useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useSubmit,
} from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";

import CustomSnackbar from "../components/Snackbar/Snackbar";
import { getTokenDuration } from "../utils/isAuth";

const RootLayout = () => {
  const location = useLocation();

  const pathName = location.pathname;

  const [isHome, setisHome] = useState(true);

  const onSnackbarCloseHandler = () => {
    setisHome(false);
  };

  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/auth/logout", method: "POST" });
      return;
    }

    const tokenDuration = getTokenDuration();

    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/auth/logout", method: "post" });
    }, tokenDuration);
  }, [submit]);

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
