import React, { useContext } from "react";
import "./CartPage.css";

import { GrFormAdd } from "react-icons/gr";
import { BiMinus } from "react-icons/bi";

import EmptyBagImage from "../../Assets/empty-bag.png";

import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";

const CartPage = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

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
          <div className="input-box">
            <input type="text" value={"DeliveryCharge"} disabled />
            <p>Rs. 150</p>
          </div>
          <br />
          <div className="input-box">
            <input type="text" placeholder="Apply your coupons here" />
            <button>Apply</button>
          </div>
        </form>
        <button className="checkout-btn">Rs. {totalPrice} Checkout</button>
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
