import React from "react";
import "./LoginPage.css";
import { Form, NavLink } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
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
