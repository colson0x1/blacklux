import React, { createContext, useContext, useState } from 'react';
import { Quantity } from '../styles/ProductDetails';

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  // adding data for the state
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // increase product quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  // add to cart
  const onAdd = (product, quantity) => {
    // total price
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity);

    // increase total quantity
    setTotalQuantities((prevTotal) => prevTotal + quantity);

    // check if product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  // remove product
  const onRemove = (product) => {
    // total price
    setTotalPrice((prevTotal) => prevTotal - product.price);

    // decrease total quantity
    setTotalQuantities((prevTotal) => prevTotal - 1);

    // check if product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);

    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        totalPrice,
        setQty,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
