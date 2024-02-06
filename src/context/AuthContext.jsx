import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
  const [isSuperAdminLoggedIn, setSuperAdminLoggedIn] = useState(false);

  const roles = {
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPERADMIN",
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setAdminLoggedIn,
        isSuperAdminLoggedIn,
        setSuperAdminLoggedIn,
        roles
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
