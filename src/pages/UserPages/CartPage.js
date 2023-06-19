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

  return (
    <div className="Cartpage">
      <div className="Cartpage-heading__title">
        {authCtx.name}'s <span>Cart</span>
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
                      name={product._id}
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
  );
};

const CartProductCard = ({
  id,
  name,
  image,
  quantity,
  onAddClick,
  onRemoveClick,
}) => {
  return (
    <div className="CartProductCard">
      <div className="CartProductCard-image">
        <img src={image} alt={name}></img>
        <div className="CartProductCard-content">
          <p>{name}</p>
        </div>
      </div>

      <div className="CartProductCard-qty">
        <GrFormAdd className="icon" size={20} onClick={onAddClick} />
        <p>{quantity}</p>
        <BiMinus className="icon" size={20} onClick={onRemoveClick} />
      </div>
    </div>
  );
};

export default CartPage;
