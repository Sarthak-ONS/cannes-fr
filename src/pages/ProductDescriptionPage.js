import React from "react";
import { useLoaderData } from "react-router-dom";

import "./ProductDescriptionPage.css";

const ProductDescriptionPage = () => {
  const data = useLoaderData();
  console.log(data.product);

  return (
    <div className="ProductDescriptionPage">
      <div className="ProductDescriptionPage-images">
        {data &&
          data.product &&
          data.product.imageUrls.map((image) => (
            <div ProductDescriptionPage-images__image>
              <img src={image.secure_url} />
            </div>
          ))}
      </div>
      <div className="ProductDescriptionPage-content">
        <h2 className="ProductDescriptionPage-content__title">
          {data && data.product && data.product.name}
        </h2>
        <h4>Brand: {data && data.product && data.product.brand}</h4>
        <h5>{data && data.product && data.product.description}</h5>
        <p>
          <button className="add-to-cart-cta" type="button">Add to Cart</button>
        </p>
      </div>
    </div>
  );
};

export async function loader({ request, params }) {
  const p = params;
  const response = await fetch(
    process.env.REACT_APP_BACKEND_HOST + "/product/" + p.productId
  );

  if (!response.ok) {
    const data = { message: "Coult not fetch Products" };
    throw { isError: true, message: data.message, status: response.status };
  }

  return response;
}

export default ProductDescriptionPage;
