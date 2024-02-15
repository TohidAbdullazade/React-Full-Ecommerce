import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAdminLoggedIn } = useContext(AuthContext); // AUTH CONTEXT
  const navigate = useNavigate(); // NAVIGATE

  // ===> MAKE A CONTROL IF THE USER IS LOGGED IN THEN RETURN THE CHILDREN ELSE RETURN NULL <===
  useEffect(() => {
    if (
      !isAdminLoggedIn &&
      localStorage.getItem("isAdminLoggedIn") === "false"
    ) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default PrivateRoute;
