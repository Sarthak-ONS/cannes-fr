import React from "react";
import "./LoginPage.css";
import {
  Form,
  NavLink,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import Loader from "../../components/Loader/Loader";

const LoginPage = () => {
  let errorMessage = "Invalid email";

  let isError = false;

  const data = useActionData();

  console.log(data);

  if (data && data.status && data.status === "ERROR") {
    isError = true;
    errorMessage = data.errorMessage;
  }
  const navigation = useNavigation();

  let isSubmitting = navigation.state === "submitting";

  return (
    <div className="login">
      <div className="login__text">
        Style Elevated,<br></br> Shop with Confidence!
      </div>
      <div className="login__form">
        <Form method="POST" className="form">
          <p className="form-title">Sign in to your account</p>
          <p className="signup-link">
            New Here?
            <NavLink to="/auth/signup"> Create a account</NavLink>
          </p>
          {isError && <div className="error-msg">{errorMessage}</div>}
          <div className="input-container">
            <input
              placeholder="Enter email"
              required
              type="email"
              name="email"
            />
          </div>
          <div className="input-container">
            <input
              placeholder="Enter password"
              required
              type="password"
              name="password"
            />
          </div>
          <button disabled={isSubmitting} className="submit" type="submit">
            <center style={{ backgroundColor: "transparent" }}>
              {isSubmitting ? <Loader /> : "Sign in"}
            </center>
          </button>

          <hr />
          <button className="submit social" type="submit">
            <FcGoogle size={25} className="google-icons" />
            Sign in with Google
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_HOST}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    }
  );

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 404
  ) {
    return response;
  }

  if (!response.ok) {
    const data = { message: "Could not authenticate user." };
    throw { isError: true, message: data.message, status: response.status };
  }

  return response;
}
