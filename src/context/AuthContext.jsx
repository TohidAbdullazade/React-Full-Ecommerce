import { createContext, useState } from "react";

export const AuthContext = createContext(); // CONTEXT OBJECT

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false); // STATE
  const [isSuperAdminLoggedIn, setSuperAdminLoggedIn] = useState(false); // STATE

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
