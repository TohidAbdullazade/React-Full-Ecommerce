import { Menu } from "antd";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { GrUserSettings } from "react-icons/gr";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaShopify } from "react-icons/fa";
import { TbBrandSlack } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate(); // NAVIGATE
  
  return (
    <>
      <div className="sideMenu_container flex-1">
        <Menu
          style={{ minWidth: 300, minHeight: "70%" }}
          className="sticky top-12"
          onClick={(item) => {
            navigate(item.key);
          }}
          items={[
            {
              label: "Dashboard",
              title: "Dashboard",
              key: "/admin",
              icon: <RxDashboard color="gray" size={17} />,
            },
            {
              label: "Users",
              title: "Users",
              icon: <GrUserSettings color="green" size={17} />,
              children: [
                {
                  label: "Create Admin",
                  key: "create-members",
                },
                {
                  label: "All Members",
                  key: "members",
                },
              ],
            },
            {
              label: "Orders",
              title: "Orders",
              key: "orders",
              icon: <TbShoppingBagPlus color="blue" size={17} />,
            },
            {
              label: "Products",
              title: "Products",
              icon: <FaShopify color="red" size={17} />,
              children: [
                {
                  label: "All Products",
                  key: "all-products",
                },
                {
                  label: "Create Products",
                  key: "create-products",
                },
              ],
            },
            {
              label: "Brands",
              title: "Brands",
              icon: <TbBrandSlack size={17} />,
              children: [
                {
                  label: "All Brands",
                  key: "all-brands",
                },
                {
                  label: "Create Brands",
                  key: "create-brand",
                },
              ],
            },
          ]}
        ></Menu>
      </div>
    </>
  );
};

export default SideMenu;
