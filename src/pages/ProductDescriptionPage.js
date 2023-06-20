import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "./ProductDescriptionPage.css";
import CartContext from "../store/cart-context";

const ProductDescriptionPage = () => {
  const data = useLoaderData();
  const cartCtx = useContext(CartContext);
  const [open, setOpen] = useState(false);

  console.log(data.product);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className="ProductDescriptionPage">
        <div className="ProductDescriptionPage-images">
          <p>Images</p>
          <ul>
            {data.product.imageUrls.map((item) => (
              <div className="item-image" key={item.id}>
                <img src={item.secure_url} alt="im"></img>
              </div>
            ))}
          </ul>
        </div>
        <div className="ProductDescriptionPage-content">
          <h2 className="ProductDescriptionPage-content__title">
            {data && data.product && data.product.name}
          </h2>
          <h3>Rs. {data.product.price}</h3>
          <h4>Brand: {data && data.product && data.product.brand}</h4>
          <h5>{data && data.product && data.product.description}</h5>
          <p>
            <button
              onClick={() => {
                cartCtx.qtyChangeHandler(data.product._id, true);
                setOpen(true)
              }}
              className="add-to-cart-cta"
              type="button"
            >
              Add to Cart
            </button>
          </p>
        </div>
      </div>

      <Snackbar
        style={{ color: "var(--primary-text-color)" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          style={{
            backgroundColor: "transparent",
            color: "var(--primary-text-color)",
          }}
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Added to Cart!
        </Alert>
      </Snackbar>
    </>
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
