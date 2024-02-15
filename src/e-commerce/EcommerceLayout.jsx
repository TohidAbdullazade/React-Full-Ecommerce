
import React from "react";
import { Outlet } from "react-router-dom";


const EcommerceLayout = () => {
  return (
    <div className="eCommerce_Layout_Container ">
      <Outlet />
    </div>
  );
};

export default EcommerceLayout;
