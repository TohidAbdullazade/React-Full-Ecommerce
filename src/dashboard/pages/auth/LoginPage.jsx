import React from "react";
import { useState } from "react";
import { Login } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import Topbar from "../../components/Topbar";


export default function LoginPage() {
  const [loginData, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (input) => {
    setData({ ...loginData, [input.target.name]: input.target.value });
   // setData({email:"",password:""})
  };
  const handleSubmit = () => {
    Login(loginData)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
   
      <div className="form-area h-screen w-screen flex my-10 mx-5 justify-center"   >
        <div className="form-content  bg-gray-50 p-2.5  h-96 rounded-md">
          <Typography.Title level={2} className="text-center">
            Login
          </Typography.Title>
          <Form
            labelCol={{ span: 24 }}
            onFinish={handleSubmit}
            autoComplete="off"
            className="form-section flex w-full flex-col min-w-[800px]  "
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
            <Button
              htmlType="submit"
              type="text"
              className="bg-blue-500 text-white"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
