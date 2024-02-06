import { Modal } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, isAdminLoggedIn }) => {
  const navigate = useNavigate();
  if (!isAdminLoggedIn) {
      Modal.confirm({
      title: "Do you want to go to the Login Page?",
      okText: "Yes",
      content: "Only Admin Super Admin can enter here!",
      onOk: () => {
        navigate("/login");
      },
      cancelText: "No",
      onCancel: () => {
        navigate("/");
      },
    });
  } else {
    return children;
  }
};

export default PrivateRoute;
