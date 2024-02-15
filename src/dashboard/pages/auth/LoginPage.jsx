import React, { useContext } from "react";
import { useState } from "react";
import { Login } from "../../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Space, Typography, message } from "antd";
import { AuthContext } from "../../../context/AuthContext";

export default function LoginPage() {
  const [loginData, setData] = useState({ email: "", password: "" }); // STATE
  const navigate = useNavigate();
  const { setAdminLoggedIn } = useContext(AuthContext); // AUTH CONTEXT

  // ===> HANDLE THE ONCHANGE EVENT <===
  const handleChange = (input) => {
    setData({ ...loginData, [input.target.name]: input.target.value });
  };
  // ===> MAKE AN LOGIN FUNCTION <===
  const handleSubmit = () => {
    Login(loginData)
      .then(({ data }) => {
        let { role, name } = data.user;
        if (role === "client") {
          navigate("/");
          message.error("Only for SuperAdmin and Admin!", 2);
        }
        if (role === "superadmin") {
          {
            setAdminLoggedIn(true);
            localStorage.setItem("isAdminLoggedIn", "true");
            navigate("/admin");
            message.success(`Welcome ${role} ${name}`, 2);
          }
        }
        if (role === "admin") {
          setAdminLoggedIn(true);
          localStorage.setItem("isAdminLoggedIn", "true");
          navigate("/admin");
          message.success(`Welcome ${role} ${name}`, 2);
        }
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          message.error("Invalid email or password");
          return;
        }
      });
  };
  return (
    <>
      <div className="form-area h-screen w-screen items-center flex my-10 mx-5 justify-center ">
        <div className="form-content  bg-gray-200 p-2.5  rounded-md ">
          <Typography.Title level={2} className="text-center">
            Login
          </Typography.Title>
          <Form
            labelCol={{ span: 24 }}
            onFinish={handleSubmit}
            autoComplete="off"
            className="form-section flex w-full flex-col min-w-[400px] min-h-[400px] "
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please Enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email !",
                },
              ]}
              hasFeedback
            >
              <Input
                name="email"
                className="w-full "
                type="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Type Email..."
              />
            </Form.Item>

            <Form.Item
              label="Password  "
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Enter your password",
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input.Password
                name="password"
                placeholder="Type Password..."
                value={loginData.password}
                onChange={handleChange}
              />
            </Form.Item>
            <Space className="block">
              <Button
                htmlType="submit"
                type="text"
                className="bg-blue-500 my-4 w-full text-white"
              >
                Submit
              </Button>
              <Link to={"/"}>
                <Button
                  htmlType="button"
                  type="text"
                  className="bg-green-500 w-full text-white"
                >
                  Back Home
                </Button>
              </Link>
            </Space>
          </Form>
        </div>
      </div>
    </>
  );
}
