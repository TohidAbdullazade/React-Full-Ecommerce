import { createContext, useContext, useState } from "react";

export const BasketContext = createContext(); // CONTEXT OBJJECT

export const BasketProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // STATE

  // ===> STATE OF THE BASKETPROVIDER  <===
    const [basket, setBasket] = useState([]); // STATE

  return (
    <BasketContext.Provider
      value={{ basket, setBasket, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </BasketContext.Provider>
  );
};
export const useBasket = () => {
  return useContext(BasketContext);
};
