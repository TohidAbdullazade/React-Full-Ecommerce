import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
  const [isSuperAdminLoggedIn, setSuperAdminLoggedIn] = useState(false);

 

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setAdminLoggedIn,
        isSuperAdminLoggedIn,
        setSuperAdminLoggedIn,
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
