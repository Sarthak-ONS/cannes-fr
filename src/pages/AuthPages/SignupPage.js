import React from "react";

import "./SignupPage.css";
import { Form, NavLink } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const errorMessage = "Invalid email";

  const isError = false;

  return (
    <div className="signup">
      <div className="signup__image">
        Online shopping is transforming the retail landscape, bringing
        convenience and endless possibilities right to your fingertips.
      </div>
      <div className="signup__form">
        <Form className="form">
          <p className="form-title">Create an account</p>
          <p className="signup-link">Let's get started</p>
          {isError && <div className="error-msg">{errorMessage}</div>}
          <div className="input-container">
            <input placeholder="Enter name" required type="text" />
          </div>
          <div className="input-container">
            <input placeholder="Enter email" required type="email" />
          </div>
          <div className="input-container">
            <input placeholder="Enter password" required type="password" />
          </div>
          <button className="submit" type="submit">
            Create Account
          </button>
        </Form>
        <button className="submit social" type="submit">
          <FcGoogle size={25} className="google-icons" />
          Sign up with Google
        </button>
        <hr />
        <p className="login-link">
          Already have an account?
          <NavLink to="/auth/login"> Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
