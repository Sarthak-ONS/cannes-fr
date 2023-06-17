import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Products.css";

import ProductCard from "../components/ProductCard/ProductCard";
import SelectCategoryCard from "../components/SelectCategoryCard/SelectCategoryCard";

const ProductsPage = () => {
  const data = useLoaderData();

  const [setselectedCategories, setSetselectedCategories] = useState([]);
  if (!data.products || data.products.length === 0) {
    return (
      <div className="Products-Page">
        <center>
          <p>Nothin to show</p>
        </center>
      </div>
    );
  }
  const onChecked = (name) => {
    setSetselectedCategories((prevState) => [...prevState, name]);
  };

  const onUnChecked = (name) => {
    setSetselectedCategories((prevState) =>
      prevState.filter((value) => value !== name)
    );
  };

  console.log(setselectedCategories);

  return (
    <div className="Products-Page">
      <div className="Products-Page__filterContainer">
        <p>Filters</p>
        <div className="categories-list">
          <h4>Categories</h4>
          <ul>
            {data.categories.map((item) => (
              <SelectCategoryCard
                key={item.id}
                id={item.id}
                name={item.name}
                onChecked={onChecked}
                onUnchecked={onUnChecked}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="Products-Page__ProductContainer">
        <ul>
          {data.products
            .filter(
              (item) =>
                setselectedCategories.length === 0 ||
                setselectedCategories.includes(item.category)
            )
            .map((item) => (
              <ProductCard
                key={item._id}
                url={item.imageUrls[0].secure_url}
                title={item.name}
                price={item.price}
                brand={item.brand}
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
