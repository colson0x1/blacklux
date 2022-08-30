import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  // adding data for the state
  const [showCart, setShowCart] =  useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);

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

  return (
    <ShopContext.Provider value={{ qty, increaseQty, decreaseQty, showCart, setShowCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
