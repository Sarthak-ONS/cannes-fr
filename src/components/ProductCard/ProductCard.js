import React from "react";
import "./ProductCard.css";
import {} from "react-router-dom";
import { getAuthToken } from "../../utils/isAuth";

const ProductCard = ({
  id,
  url,
  title,
  price,
  discountedPrice,
  isOnSale = true,
  brand = "Levis",
  addToCartSuccess,
  addToCartFailure,
}) => {
  const addtoCardButtonClickHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_HOST}/cart/add`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken(),
        },
        body: JSON.stringify({ productId: id }),
      }
    );
    if (response.ok) {
      addToCartSuccess();
    } else {
      addToCartFailure();
    }
  };

  return (
    <div className="Product__card">
      {isOnSale && <div className="Product__card-sales-tag">Sale</div>}
      <div className="Product__card-img">
        <img alt="Produc" src={url} />
      </div>
      <div className="Product__card-content">
        <div className="Product__card-details">
          <div className="Product__card-brand">{brand}</div>
          <div className="Product__card-title">{title}</div>
          <div className="Product__card-prices">
            <div className="Product__card-prices_price1">Rs. {price}</div>
            {isOnSale && (
              <div className="Product__card-prices_price2">
                Rs. {discountedPrice}
              </div>
            )}
            <button
              onClick={addtoCardButtonClickHandler}
              className="add-to-cart"
              type="submit"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
