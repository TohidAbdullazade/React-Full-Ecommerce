import React, { useContext, useEffect, useState } from "react";
import { Register, getProfile } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, message } from "antd";

const CreateAdmin = () => {
  const navigate = useNavigate(); // NAVIGATE
  const [user, setUser] = useState({  // STATE
    name: "", 
    surname: "",
    email: "",
    password: "",
  });
  // ===> HANDLE ONCHANGE EVENT <===
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ===> LOGIN OLAN USER YOXLMAQ ÜÇÜNDÜR || DATA REFRESH OLANDAN SONRA GƏLİR <===

  // const loggedAdmin = () => {
  //   getProfile()
  //     .then(({ data }) => {
  //       console.log(data.user);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  // useEffect(() => {
  //   loggedAdmin();
  // }, []);

  //  ===> CREATE ADMIN MEMBERS <===
  const handleSubmit = () => {
    Register(user)
      .then(({ data }) => {
        setUser(data);
        console.log(data);
        navigate("/admin/members"); // NAVIGATE
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          message.error(
            "This email is available, change the email to complete the request!",
            3
          );
          return;
        }
        if (error.response.status === 404) {
          message.info("Server Error !");
        }
      });
  };

  return (
    <>
      <div className="register-area h-screen w-screen flex my-10 mx-5 ">
        <div className="register-content  border bg-gray-50 p-2.5 ">
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
