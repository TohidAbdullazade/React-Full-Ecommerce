import React from "react";
import { MainRoutes } from "./routes";
import "./style.css";

const App = () => {
  return (
    <div className="full-app-container overflow-x-hidden">
      <MainRoutes />
    </div>
  );
};

export default App;
