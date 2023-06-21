import React from "react";

import "./OrdersPage.css";
import { getAuthToken } from "../../utils/isAuth";
import { useLoaderData } from "react-router-dom";

const OrdersPage = () => {
  const data = useLoaderData();
  console.log(data.orders);

  return (
    <div className="OrdersPage">
      <h1 style={{ textAlign: "center" }}>Your orders</h1>
      <ul>
        {data.orders.map((item) => (
          <div className="OrderCard" key={item._id}>
            <div className="OrderCard__orderId">
              <h5>Order Id : </h5>
              <div> {item._id}</div>
            </div>
            <div>{convertUtctoLocal(item.createdAt)}</div>
            <div className="OrderCard__status">
              <h5>Status : </h5>
              <div> {item.status}</div>
            </div>
            <hr></hr>
            <div className="OrderCard-productsList">
              <h5>Products</h5>
              {item.products.map((item) => {
                if (item.product.name.length > 15) {
                  item.product.name = item.product.name.substring(0, 23);
                }
                return (
                  <li>
                    {item.product.name} x {item.quantity}
                  </li>
                );
              })}
            </div>
            <hr></hr>
            <div>Rs.{item.totalAmount}</div>
            <div>
              {item.shippingAddress.street}, {item.shippingAddress.city}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

const convertUtctoLocal = (str) => {
  const date = new Date(str);

  const day = date.getDate();
  const monthName = date.toLocaleString("default", { month: "long" }); // Month value is zero-based, so adding 1
  const year = date.getFullYear();
  return `${day}, ${monthName}, ${year}`;
};

export async function loader() {
  const token = getAuthToken();
  const response = await fetch(
    process.env.REACT_APP_BACKEND_HOST + "/user/orders",
    {
      credentials: "include",
      headers: token
        ? {
            Authorization: "Bearer " + token,
          }
        : {},
    }
  );
  if (!response.ok) {
    const data = { message: "Coult not fetch Profile" };
    throw { isError: true, message: data.message, status: response.status };
  }

  return response;
}

export default OrdersPage;
