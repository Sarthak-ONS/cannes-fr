import React from "react";
import "./ProductCard.css";

import { BsCartPlus } from "react-icons/bs";

const ProductCard = ({ url, title, price, discountedPrice, isOnSale }) => {
  return (
    <div className="Product__card">
      {isOnSale && <div className="Product__card-sales-tag">Sale</div>}
      <div className="Product__card-img">
        <img alt="Produc" src={url} />
      </div>
      <div className="Product__card-content">
        <div className="Product__card-details">
          <div className="Product__card-title">{title}</div>
          <div className="Product__card-prices">
            <div className="Product__card-prices_price1">₹{price}</div>
            {isOnSale && (
              <div className="Product__card-prices_price2">
                ₹{discountedPrice}
              </div>
            )}
          </div>
        </div>
        <div className="Product__card-btn">
          <BsCartPlus size={30} color="white" className="cart-btn" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
