import React from "react";
import "./CartPage.css";
import { getAuthToken } from "../../utils/isAuth";
import { useLoaderData } from "react-router-dom";

const CartPage = () => {
  const data = useLoaderData();

  console.log(data);

  return <div className="Cartpage">CartPage</div>;
};

export async function loader({ request, params }) {
  const response = await fetch(process.env.REACT_APP_BACKEND_HOST + "/cart/", {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  if (!response.ok) {
    const data = { message: "Coult not fetch Products" };
    throw { isError: true, message: data.message, status: response.status };
  }

  return response;
}

export default CartPage;
