import "./style.css";
import React from "react";
import { MainRoutes } from "./routes";


const App = () => {
  return (
    <div className="full-app-container overflow-x-hidden">
      <MainRoutes />
    </div>
  );
};

export default App;
