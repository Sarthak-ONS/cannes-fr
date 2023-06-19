import { useEffect, useState } from "react";

import CartContext from "./cart-context";
import { getAuthToken } from "../utils/isAuth";

const CartProvider = (props) => {
  const [cart, setcart] = useState({});

  const [refreshCart, setrefreshCart] = useState(false);

  const qtyChangeHandler = async (productId) => {
    try {
      console.log(productId);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/cart/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ productId }),
        }
      );

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        setcart(data.cart);
        setrefreshCart(true);
      } else {
      }
    } catch (error) {
      console.log(error, "This is the error from catch block");
    }
  };

  const token = getAuthToken();
  useEffect(() => {
    console.log(token, "This is the token value");

    const fetchCart = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_HOST}/cart`,
          {
            method: "GET",
            credentials: "include",
            headers: token
              ? {
                  Authorization: "Bearer " + token,
                }
              : {},
          }
        );

        if (response.ok) {
          const data = await response.json();
          setcart(data.cart);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error, "This is the error from catch block");
      }
    };

    fetchCart();
  }, [token, refreshCart]);

  const cartContext = {
    ...cart,
    setrefreshCart,
    qtyChangeHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
