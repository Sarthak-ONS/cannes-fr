import React, { useEffect, useContext } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";

import { getTokenDuration } from "../utils/isAuth";
import AuthContext from "../store/auth-context";

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  const authCtx = useContext(AuthContext);

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

  // const token = getAuthToken();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_HOST}/auth/user`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.ok) {
          const userProfileData = await response.json();
          authCtx.setUserProfile(userProfileData.user);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error, "This is the error from catch block");
      }
    };

    fetchUserProfile();
  }, [token]);

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
