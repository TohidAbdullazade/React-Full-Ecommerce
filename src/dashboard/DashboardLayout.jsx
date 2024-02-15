import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";
import SideMenu from "./components/SideMenu";

const DashboardLayout = () => {


  return (
    <div className="full-dashboard-layout  ">
      <Topbar />
      <div className="full-content flex ">
        <SideMenu />
        <div className="outlet-container flex-[4]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
