import React, { useContext } from "react";
import { SiPhpmyadmin } from "react-icons/si";
import { Avatar, Modal, Popover, Typography } from "antd";
import { FaRegBell } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import AdminProfile from "../../assets/img/admin-profile.webp";
import { CiLogout } from "react-icons/ci";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const navigate = useNavigate(); // NAVIGATE
  const location = useLocation(); // LOCATION
  const currentPath = location.pathname; // PATH
  const { setAdminLoggedIn } = useContext(AuthContext); // AUTH CONTEXT
 
  // ===> MAKE THE ADMIN LOGOUT <===
  const setAdminToLogout = () => {
    Modal.confirm({
      title:
        "If you log out, you will be redirected to the Lamastore E-commerce page",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: { className: "bg-green-500 text-white" },
      cancelButtonProps: { className: "bg-red-600 text-white " },
    
      onOk: () => {
        navigate("/");
        setAdminLoggedIn(false);
        localStorage.setItem("isAdminLoggedIn", false);
      },
      okCancel: () => {
        navigate(currentPath);
      },
    });
  };

  return (
    <>
      <div className="full-header flex justify-between items-center px-10 h-[80px] bg-slate-200 ">
        <div className="left-section flex items-center ">
          <div className="logo-are ">
            <SiPhpmyadmin fill="lightblue" size={82} />
          </div>
        </div>
        <div className="center-section">
          <div className="link-area">
            <Typography.Title
              type="warning"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Lamastore Admin Panel
            </Typography.Title>
          </div>
        </div>
        <div className="right-section">
          <div className="icons-area">
            <ul className="flex justify-center items-center gap-5  cursor-pointer">
              <Link to={"/admin"}>
                <li>
                  <Popover content="Home Page" trigger={"hover"}>
                    <IoHomeOutline size={22} fill="red" />
                  </Popover>
                </li>
              </Link>
              <li>
                <Popover content="Notifications" trigger={"hover"}>
                  <FaRegBell size={22} fill="red" />
                </Popover>
              </li>
              <li>
                <Popover content="Task List" trigger={"hover"}>
                  <CiBoxList size={22} fill="green" />
                </Popover>
              </li>
              <li>
                <Popover content="Messages" trigger={"hover"}>
                  <TiMessages size={22} fill="blue" />
                </Popover>
              </li>
              <li>
                <Popover content="profile" trigger={"hover"}>
                  <Avatar draggable="false" size={50} src={AdminProfile} />
                </Popover>
              </li>
              <li>
                <Popover content="Log Out" trigger={"hover"}>
                  <CiLogout size={22} fill="black" onClick={setAdminToLogout} />
                </Popover>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
