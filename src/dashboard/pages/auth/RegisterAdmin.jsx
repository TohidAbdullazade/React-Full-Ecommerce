import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import Topbar from "../../components/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { GET_ALL_ADMINS } from "../../../services/auth";


const RegisterAdmin = () => {
  const navigate = useNavigate();

  const [check, setCheck] = useState(false);
  const [data, setData] = useState([]);

  const [register, setRegister] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    GET_ALL_ADMINS().then(({ data }) => {
      setData(data);
    });
  }, []);
  const handleFinish = (value) => {
    console.log(value);
    navigate("admin/");
  };

  const handleLogin = (value) => {};
  return (
    <>
      <div className="register-container bg-slate-950  h-screen w-screen flex  justify-center ">
        <div className="register-content bg-gray-50 p-2.5 my-10 mx-5  rounded-md  ">
          <Typography.Title level={3} type="secondary" className="text-center">
            Register Form
          </Typography.Title>
          <Form
            autoComplete="off"
            onFinish={handleFinish}
            className="form-section flex w-full flex-col min-w-[800px]"
            labelCol={{ span: 24 }}
          >
            <Form.Item
              label="Name"
              name={"name"}
              //  rules={[{ required: true }, { whitespace: true }]}
              hasFeedback
            >
              <Input
                value={register.name}
                onChange={handleChange}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Surname"
              name={"surname"}
              //  rules={[{ required: true }, { whitespace: true }]}
              hasFeedback
            >
              <Input
                value={register.surname}
                onChange={handleChange}
                name="surname"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                // { required: true },
                { type: "email", message: "Please Enter valid Email" },
              ]}
              hasFeedback
            >
              <Input
                value={register.email}
                onChange={handleChange}
                name="email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              //  rules={[{ required: true }, { whitespace: true }]}
              hasFeedback
            >
              <Input.Password
                value={register.password}
                onChange={handleChange}
                name="password"
              />
            </Form.Item>
            <p className="text-base  w-full ">
              If you Have an Account click to
              <span className=" text-gray-400 hover:underline text-sm w-full">
                Login
              </span>
            </p>
            <Button
              type="text"
              htmlType="submit"
              className="bg-blue-500 text-white my-5"
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterAdmin;
