import React from "react";
import "./LoginPage.css";
import { Form, NavLink, redirect } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const errorMessage = "Invalid email";

  const isError = false;

  return (
    <div className="login">
      <div className="login__text">
        Style Elevated,<br></br> Shop with Confidence!
      </div>
      <div className="login__form">
        <Form className="form">
          <p className="form-title">Sign in to your account</p>
          <p className="signup-link">
            New Here?
            <NavLink to="/auth/signup"> Create a account</NavLink>
          </p>
          {isError && <div className="error-msg">{errorMessage}</div>}
          <div className="input-container">
            <input placeholder="Enter email" required type="email" />
          </div>
          <div className="input-container">
            <input placeholder="Enter password" required type="password" />
          </div>
          <button className="submit" type="submit">
            Sign in
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

  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

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

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  localStorage.setItem("expiration", expirationDate.toISOString());

  return redirect("/");
}
