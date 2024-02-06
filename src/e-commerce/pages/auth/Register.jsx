import React, { useState } from "react";
import { Button, Form, Input, Spin, Typography } from "antd";
import { CREATE_CLIENT } from "../../../services/Clients";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Register = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleFinish = () => {
    CREATE_CLIENT(client).then(({ data }) => {
      setClient(data);
      setClient({ name: "", surname: "", email: "", password: "" });
      navigate("/basket");

      localStorage.setItem("clientToken", data.token);
    });
  };
  return (
    <>
      <Header />
      <div className="register-container m-10 p-5 min-w-[800px] border rounded-md">
        <div className="register-content ">
          <Typography.Title type="danger" className="text-center" level={2}>
            Register Form
          </Typography.Title>
          <Form
            labelCol={{ span: 24 }}
            autoComplete="off"
            onFinish={handleFinish}
          >
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Type Your Name Please",
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input value={client.name} name="name" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Surname"
              name="Surname"
              rules={[
                {
                  required: true,
                  message: "Type Your Surname Please",
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                value={client.surname}
                name="surname"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Type Your Name Email Please",
                },
                {
                  type: "email",
                  message: "Type a valid email !!!",
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                value={client.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="Password"
              rules={[
                {
                  required: true,
                  message: "Type Your Password Please",
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input.Password
                value={client.password}
                name="password"
                onChange={handleChange}
              />
            </Form.Item>
            <Button
              type="text"
              htmlType="submit"
              className="w-full bg-blue-500 texit-white"
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
