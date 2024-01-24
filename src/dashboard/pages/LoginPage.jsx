import React from "react";
import { useState } from "react";
import { Login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginData, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (input) => {
    setData({ ...loginData, [input.target.name]: input.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          className="bg-[#929292]"
          type="email"
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          className="bg-[#929292]"
          type="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
