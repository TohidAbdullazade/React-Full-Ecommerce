import React, { useContext, useEffect, useState } from "react";
import { GET_ALL_ADMINS, Register } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, message } from "antd";


const CreateAdmin = () => {
  

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    Register(user).then(({ data }) => {
      setUser(data);
      localStorage.setItem("adminRole", data.user.role);
      console.log(data);
      navigate("/admin/members"); // NAVIGATE
    });
  };

  return (
    <>
      <div className="register-area h-screen w-screen flex my-10 mx-5 ">
        <div className="register-content  border bg-gray-50 p-2.5  rounded-md">
          <Typography.Title level={2} className="text-center">
            Create Admin
          </Typography.Title>
          <Form
            onFinish={handleSubmit}
            autoComplete="off"
            labelCol={{ span: 24 }}
            className="form-section flex w-full   flex-col min-w-[800px]"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please Enter your Name",
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Surname"
              name="surname"
              rules={[
                {
                  required: true,
                  message: "Please Enter your Surname",
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                type="text"
                name="surname"
                value={user.surname}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please Enter your Email",
                },
                {
                  type: "email",
                  message: "Please Enter a Valid Email",
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please Enter your Password",
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="text"
              className=" my-2.5 bg-blue-500 text-white"
            >
              Create
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateAdmin;
