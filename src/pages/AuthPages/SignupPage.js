import React from "react";

import "./SignupPage.css";
import { Form, NavLink, useActionData } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  let errorMessage = "Invalid email";

  let isError = false;

  let showMessageBox = false;

  const data = useActionData();

  console.log(data, "///////////");

  if (data && data.status && data.status === "ERROR") {
    showMessageBox = true;
    isError = true;
    errorMessage = data.errorMessage;
  }
  if (data && data.status && data.status === "SUCCESS") {
    showMessageBox = true;
    errorMessage = data.message;
  }

  let msgClass = isError ? "error-msg" : "success-msg";

  return (
    <div className="signup">
      <div className="signup__image">
        Online shopping is transforming the retail landscape, bringing
        convenience and endless possibilities right to your fingertips.
      </div>
      <div className="signup__form">
        <Form method="POST" className="form">
          <p className="form-title">Create an account</p>
          <p className="signup-link">Let's get started</p>
          {showMessageBox && <div className={msgClass}>{errorMessage}</div>}
          <div className="input-container">
            <input placeholder="Enter name" required type="text" name="name" />
          </div>
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

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_HOST}/auth/signup`,
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
    const data = { message: "Could not signup user." };
    throw { isError: true, message: data.message, status: response.status };
  }

  console.log(await response.json());

  return response;
}
