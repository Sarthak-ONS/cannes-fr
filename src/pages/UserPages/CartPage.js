import React, { useContext, useState } from "react";
import "./CartPage.css";

import { GrFormAdd } from "react-icons/gr";
import { BiMinus } from "react-icons/bi";

import EmptyBagImage from "../../Assets/empty-bag.png";

import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";

const CartPage = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const [couponCode, setCouponCode] = useState(cartCtx.couponCode);
  console.log(cartCtx, "This is the cartCtx bete the saww");

  if (!cartCtx.items || cartCtx.items.length === 0)
    return (
      <div className="CartPage-Empty">
        <img src={EmptyBagImage} alt="Empty Bag" />
        <p>Your Cart is Empty</p>
      </div>
    );

  let totalPrice = 0;
  cartCtx.items.forEach(({ product, quantity }) => {
    totalPrice = totalPrice + product.price * quantity;
  });

  const couponChangeHandler = (event) => {
    setCouponCode(event.target.value);
  };

  const onApplyDiscountHandler = (e) => {
    console.log(couponCode);
    cartCtx.applyDiscountHandler(couponCode);
  };

  const checkoutHandler = () => {
    cartCtx.checkoutHandler();
  };

  return (
    <div className="Cartpage-wrapper">
      <div className="Cartpage">
        <div className="Cartpage-heading__title">
          {authCtx.name}'s <span>Cart</span>
          <div className="Cartpage-heading__title-timeline">
            Cart · Checkout · Payment
          </div>
        </div>
        <div className="Cartpage-items">
          <ul>
            {cartCtx.items &&
              cartCtx.items.map(
                ({ product, quantity, _id }) =>
                  product && (
                    <li key={_id}>
                      <CartProductCard
                        id={product._id}
                        price={product.price}
                        name={product.name}
                        image={product.imageUrls[0].secure_url}
                        quantity={quantity}
                        onAddClick={() => {
                          cartCtx.qtyChangeHandler(product._id, true);
                        }}
                        onRemoveClick={() => {
                          cartCtx.qtyChangeHandler(product._id, false);
                        }}
                      />
                    </li>
                  )
              )}
          </ul>
        </div>
      </div>
      <div className="checkout-container">
        <form class="discount-form">
          <p>All prices includes GST</p>
          <div className="input-box">
            <input type="text" value={"Total"} disabled />
            <p>Rs. {totalPrice}</p>
          </div>
          <br />
          <div className="input-box">
            <input type="text" value={"DeliveryCharge"} disabled />
            <p>Rs. 150</p>
          </div>
          <br />
          <div className="input-box">
            <input
              defaultValue={cartCtx.couponCode}
              onChange={couponChangeHandler}
              type="text"
              placeholder="Apply your coupons here"
              name="couponCode"
            />
            <button type="button" onClick={onApplyDiscountHandler}>
              {cartCtx.couponCode ? "Applied" : "Apply"}
            </button>
          </div>
          {cartCtx.couponCode &&
            cartCtx.couponCode === "FLAT50" &&
            "Discount Applied"}
        </form>
        <button onClick={checkoutHandler} className="checkout-btn">
          Rs. {cartCtx.totalPrice} Checkout
        </button>
      </div>
    </div>
  );
};

const CartProductCard = ({
  name,
  image,
  quantity,
  onAddClick,
  onRemoveClick,
  price,
}) => {
  if (name.length > 15) {
    name = name.slice(0, 15);
  }

  return (
    <div className="CartProductCard">
      <div className="CartProductCard-image">
        <img src={image} alt={name}></img>
        <div className="CartProductCard-content">
          <p>{name}</p>
        </div>
      </div>

      <div className="CartProductCard-qty">
        Rs. {price}
        <GrFormAdd className="icon" size={20} onClick={onAddClick} />
        <p>{quantity}</p>
        <BiMinus className="icon" size={20} onClick={onRemoveClick} />
      </div>
    </div>
  );
};

export default CartPage;
