import React, { useEffect, useState } from "react";
import { Register } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Register(user).then(({ data }) => {
      setUser(data);

      navigate("/admin");
    });
  };

  return (
    <>
      <div className="form-area ">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="bg-[#e1e1e1]"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="surname"
            className="bg-[#e1e1e1]"
            value={user.surname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="bg-[#e1e1e1]"
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="bg-[#e1e1e1]"
            value={user.password}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default CreateAdmin;
