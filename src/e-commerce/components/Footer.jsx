import React from "react";
import payment from "../../assets/img/payment.png";
import { Typography } from "antd";

const Footer = () => {
  return (
    <footer className="full-footer  px-10 flex flex-col gap-10 py-10 ">
      <div className="footer-top-section">
        <div className="footer-left-side flex gap-56 ">
          <div className="left-side-main flex flex-col w-1/2">
            <Typography.Title type="success" level={4}>
              Categories
            </Typography.Title>
            <span className="text-gray-400 cursor-pointer ">
              <p className="hover:underline">Man</p>
              <p className="hover:underline">Women</p>
              <p className="hover:underline">Children</p>
              <p className="hover:underline">Accesssories</p>
              <p className="hover:underline">New Arrivals</p>
            </span>
          </div>
          <div className="left-side-main flex flex-col">
            <Typography.Title type="secondary" level={4}>
              Links
            </Typography.Title>
            <span className="text-blue-400 cursor-pointer ">
              <p className="hover:underline">FAQ</p>
              <p className="hover:underline">Pages</p>
              <p className="hover:underline">Stores</p>
              <p className="hover:underline">Compare</p>
              <p className="hover:underline">Cookies</p>
            </span>
          </div>
          <div className="footer-right-side flex gap-9 justify-between">
            <div className="right-side-main ">
              <Typography.Title type="danger" level={4}>
                About
              </Typography.Title>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                dolor alias odit architecto similique dolorum eligendi! Ex non
                ipsam id eum aperiam quod quibusdam. Fugiat ipsa ullam voluptas
                dolorum. Quaerat?
              </p>
            </div>
            <div className="right-side-main ">
              <Typography.Title level={4}>Contact</Typography.Title>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                dolor alias odit architecto similique dolorum eligendi! Ex non
                ipsam id eum aperiam quod quibusdam. Fugiat ipsa ullam voluptas
                dolorum. Quaerat?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom-section flex justify-between items-center ">
        <div className="left-side">
          <span className="text-gray-400 font-sans">
            <span className="font-semibold text-3xl pr-1 text-blue-600 ">
              Lamastore
            </span>
            Copyright &bull;&copy; 2023 All Rights Reserved
          </span>
        </div>
        <div className="right-side ">
          <img src={payment} draggable="false" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
