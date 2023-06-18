import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";

import { getTokenDuration } from "../utils/isAuth";

const RootLayout = () => {
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

    setTimeout(() => {
      submit(null, { action: "/auth/logout", method: "POST" });
    }, tokenDuration);
  }, [submit, token]);

  return (
    <div>
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;
