import { Menu } from "antd";
import React, { memo } from "react";
import { RxDashboard } from "react-icons/rx";
import { GrUserSettings } from "react-icons/gr";
import { FiLogIn } from "react-icons/fi";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaShopify } from "react-icons/fa";
import { TbBrandSlack } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
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
              key: "home",
              icon: <RxDashboard color="gray" size={17} />,
            },
            {
              label: "Users",
              title: "Dashboard",
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
                // {
                //   label: "Update Products",
                //   key: "/admin/update-products",
                // },
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
                // {
                //   label: "Update Brands",
                //   key: "/admin/update-brands",
                // },
              ],
            },
            {
              label: "Login",
              key: "/login",
              icon: <FiLogIn size={17} />,
            },
          ]}
        ></Menu>
      </div>
    </>
  );
};

export default memo(SideMenu);
