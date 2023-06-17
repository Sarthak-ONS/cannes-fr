import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Products.css";

import ProductCard from "../components/ProductCard/ProductCard";

const ProductsPage = () => {
  const data = useLoaderData();
  console.log(data.products);

  if (!data.products || data.products.length === 0) {
    return (
      <div className="Products-Page">
        <center>
          <p>Nothin to show</p>
        </center>
      </div>
    );
  }

  return (
    <div className="Products-Page">
      <div className="Products-Page__filterContainer">
        <p>Filters</p>
      </div>
      <div className="Products-Page__ProductContainer">
        <ul>
          {data.products.map((item) => (
            <ProductCard
              url={item.imageUrls[0].secure_url}
              title={item.name}
              price={item.price}
            ></ProductCard>
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function loader({ request, params }) {
  const response = await fetch(process.env.REACT_APP_BACKEND_HOST + "/product");

  if (!response.ok) {
    const data = { message: "Coult not fetch Products" };
    throw { isError: true, message: data.message, status: response.status };
  }

  return response;
}

export default ProductsPage;
