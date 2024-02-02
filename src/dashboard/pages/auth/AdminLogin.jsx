import React, { useState } from "react";
import { Form, Typography, Button, Input } from "antd";
import { useParams } from "react-router-dom";

const AdminLogin = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
const {id} = useParams()
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleFinish = (value) => {
    console.log(value);
  };
  return (
    <>
      <div className="admin-login-page h-screen w-screen flex my-10 mx-5 justify-center">
        <div className="adminPage-content bg-gray-50 p-2.5  h-96 rounded-md">
          <Typography.Title level={3} type="secondary" className="text-center">
            Admin Login
          </Typography.Title>
          <Form autoComplete="off"
            onFinish={handleFinish}
            className="form-section flex w-full flex-col min-w-[800px]"
            labelCol={{ span: 24 }}
          >
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                { required: true },
                { type: "email", message: "Please Enter Correct Email" },
              ]}
              hasFeedback
            >
              <Input value={login.email} onChange={handleChange} name="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[{ required: true }, { whitespace: true }]}
              hasFeedback
            >
              <Input.Password
                value={login.password}
                onChange={handleChange}
                name="password"
              />
            </Form.Item>
            <Button
              type="text"
              htmlType="submit"
              className="bg-blue-500 text-white my-2.5"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
