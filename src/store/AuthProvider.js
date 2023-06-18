import { useEffect, useState } from "react";

import AuthContext from "./auth-context";
import { getAuthToken } from "../utils/isAuth";

const AuthProvider = (props) => {
  const [userProfile, setUserProfile] = useState({
    userId: "",
    name: "",
    email: "",
    imageUrl: "",
  });
  const token = getAuthToken();

  console.log("The token is : ", token);

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
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error, "This is the error from catch block");
      }
    };

    fetchUserProfile();
  }, [token]);

  const authContext = {
    ...userProfile,
    setUserProfile,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
