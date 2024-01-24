import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="full-header h-20 bg-gray-100 flex   justify-between items-center px-10 sm:[flex p-0 m-0 bg-red-500] ">
        <div className="nav-links flex gap-8 cursor-pointer   ">
          <span className="flex relative ">
            <LiaFlagUsaSolid size={25} className="relative" />
            <IoIosArrowDown className="absolute top-2 -right-4" />
          </span>
          <ul className="flex gap-8 ">
            <li className="relative">
              USD
              <IoIosArrowDown className="absolute top-2 -right-4" />
            </li>
            <Link to={"/products/1"}>
              <li>Men</li>
            </Link>
            <Link to={"/products/2"}>
              <li>Women</li>
            </Link>
            <Link to={"/products/3"}>
              <li>Children</li>
            </Link>
            <li>Accessories</li>
          </ul>
        </div>

        <div className="homeLink-container ">
          <Link to={"/"}>
            <Typography.Title
              type="warning"
              style={{ letterSpacing: 3, fontFamily: "monospace" }}
              level={1}
            >
              Lamastore
            </Typography.Title>
          </Link>
        </div>

        <div className="second-navlinks">
          <ul className="flex items-center gap-5 cursor-pointer">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Store</li>
            <li>
              <IoSearchOutline />
            </li>
            <li>
              <FaRegUser fill="blue" />
            </li>
            <li>
              <MdFavoriteBorder fill="red" />
            </li>

            <li className="relative">
              <AiOutlineShoppingCart fill="green" />
              <span className="absolute -top-4 -right-3 w-5 h-5 flex justify-center items-center rounded-full bg-red-500 text-white">
                0
              </span>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
