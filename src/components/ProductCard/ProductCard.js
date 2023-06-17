import React from "react";
import "./ProductCard.css";

const ProductCard = ({
  url,
  title,
  price,
  discountedPrice,
  isOnSale,
  brand = "Levis",
}) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
