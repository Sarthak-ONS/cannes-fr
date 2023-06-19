import { useEffect, useState } from "react";

import CartContext from "./cart-context";
import { getAuthToken } from "../utils/isAuth";

const CartProvider = (props) => {
  const [cart, setcart] = useState({});

  const [refreshCart, setrefreshCart] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_HOST}/cart`,
          {
            method: "GET",
            credentials: "include",
            headers: getAuthToken()
              ? {
                  Authorization: "Bearer " + getAuthToken(),
                }
              : {},
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.cart, "THis is the data from cartCtx set Cart");
          setcart({});
          setcart(data.cart);
          setrefreshCart(false);
        } else {
          console.log(response);
          setrefreshCart(false);
        }
      } catch (error) {
        console.log(error, "This is the error from catch block");
        setrefreshCart(false);
      }
    };

    fetchCart();
  }, [refreshCart]);

  const qtyChangeHandler = async (productId, addorRemove) => {
    let url = `${process.env.REACT_APP_BACKEND_HOST}/cart`;

    if (addorRemove) {
      url = url + "/add";
    } else {
      url = url + "/remove";
    }

    console.log(url);
    try {
      const response = await fetch(url, {
        method: addorRemove ? "POST" : "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken(),
        },
        body: JSON.stringify({ productId }),
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data, "This is the data after adding a product");
        setrefreshCart(true);
      } else {
      }
    } catch (error) {
      console.log(error, "This is the error from catch block");
    }
  };

  const cartContext = {
    ...cart,
    setcart,
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
