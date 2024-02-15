import React, { useEffect, useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { CREATE_CLIENT } from "../../../services/Clients";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { useBasket } from "../../../context/BasketContext";

const Register = () => {
  const navigate = useNavigate(); // NAVIGATE
  const { setIsLoggedIn } = useBasket(); // CHECK OF USER IS LOGGED IN

  
  const [client, setClient] = useState({ // STATE
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  // ===> HANDLE ONCHANGE EVENT <===
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  // ===> CLIENT REGISTER FORM <===
  const handleFinish = () => {
    CREATE_CLIENT(client)
      .then(({ data }) => {
        setClient(data);
        localStorage.setItem("clientToken", data.token);
        console.log(data)
        setIsLoggedIn(true);
        navigate("/basket");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          message.error("This password or email already exist!");
          return;
        } else {
          console.log(err.message);
        }
      });
  };
  return (
    <>
      <div className="form-area w-full h-full flex items-center  justify-center">
        <div className="register-container m-10 p-5 w-[400px]   border rounded-md shadow-md">
          <div className="register-content  ">
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
                //  name="Name"
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
                <Input
                  value={client.name}
                  name="name"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Surname"
                //  name="Surname"
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
                //  name="Email"
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
                //  name="Password"
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
                className="w-full bg-blue-500 text-white hover:text-white"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
