import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Typography } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useBasket } from "../../context/BasketContext";

const Header = () => {
  const { basket,setBasket } = useBasket(); // BASKET CONTEXT

  //  ===> CHECK THE LAST COUNT FROM STORAGE AND SHOW IT ON THE HEADER <===
   useEffect(() => {
    if (localStorage.getItem("basket")) {
      let basket = localStorage.getItem("basket");
      let parsedBasket = JSON.parse(basket);
      setBasket(parsedBasket);
    }
     else {
      let basket = [];
      setBasket(basket);
    }
  }, []);

  return (
    <>
      <header className="full-header h-20 bg-gray-100 flex   justify-between items-center px-10  ">
        <div className="nav-links flex gap-8 cursor-pointer   ">
          <span className="flex relative ">
            <LiaFlagUsaSolid size={25} className="relative" />
            <IoIosArrowDown className="absolute top-2 -right-4" />
          </span>
          <ul className="flex gap-8 text-gray-400 ">
            <li className="relative">
              USD
              <IoIosArrowDown className="absolute top-2 -right-4" />
            </li>
            <NavLink
              to={"/products/1"}
              className={({ isActive }) => (isActive ? "text-red-500" : "")}
            >
              <li>Men</li>
            </NavLink>
            <NavLink
              to={"/products/2"}
              className={({ isActive }) => (isActive ? "text-red-500" : "")}
            >
              <li>Women</li>
            </NavLink>
            <NavLink
              to={"/products/3"}
              className={({ isActive }) => (isActive ? "text-red-500" : "")}
            >
              <li>Children</li>
            </NavLink>
          </ul>
        </div>

        <div className="homeLink-container ">
          <Link to={"/"}>
            <Typography.Title
              type="warning"
              style={{
                letterSpacing: 3,
                fontFamily: "JetBrains Mono, monospace",
              }}
              level={1}
            >
              Lamastore
            </Typography.Title>
          </Link>
        </div>

        <div className="second-navlinks">
          <ul className="flex items-center gap-5 cursor-pointer text-gray-400">
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "text-red-500" : "")}
            >
              <li>Home</li>
            </NavLink>

            <NavLink
              to={"/about"}
              className={({ isActive }) => (isActive ? "text-red-500 " : "")}
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) => (isActive ? "text-red-500 " : "")}
            >
              <li>Contact</li>
            </NavLink>
           
            <Link to={"/register"}>
              <li>
                <FaRegUser fill="blue" />
              </li>
            </Link>

            <li>
              <MdFavoriteBorder fill="red" />
            </li>

            <Link to={"/basket"}>
              <li className="relative">
                <AiOutlineShoppingCart fill="green" />
                <span className="absolute -top-4 -right-3 w-5 h-5 flex justify-center items-center rounded-full bg-red-500 text-white">
                  {basket.length}
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
