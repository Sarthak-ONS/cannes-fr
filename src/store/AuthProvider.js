import { useEffect, useState } from "react";

import AuthContext from "./auth-context";
import { getAuthToken } from "../utils/isAuth";

const AuthProvider = (props) => {
  const [refresh, setRefresh] = useState(true);
  const [userProfile, setUserProfile] = useState({
    userId: "",
    name: "",
    email: "",
    imageUrl: "",
  });
  const token = getAuthToken();
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
          setUserProfile(userProfileData.user);
          setRefresh(false);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error, "This is the error from catch block");
        setRefresh(false);
      }
    };

    if (refresh) {
      fetchUserProfile();
    }
  }, [token]);

  const refreshAuth = () => {
    console.log("REFRESH AUTH VALUE CHANGED");
    setRefresh(true);
  };

  const authContext = {
    ...userProfile,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
