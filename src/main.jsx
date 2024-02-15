import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { BasketProvider } from "./context/BasketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BasketProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </BasketProvider>
  </>
);
