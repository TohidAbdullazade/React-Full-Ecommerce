import React from "react";
import { Outlet } from "react-router-dom";


const EcommerceLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default EcommerceLayout;
