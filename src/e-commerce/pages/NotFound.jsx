import React from "react";
import { Card } from "antd";
import skyPicture from "../../../src/assets/img/skyPicture.jpeg";
import Meta from "antd/es/card/Meta";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="full-container bg-gray-300 h-screen w-screen relative overflow-x-hidden">
        <div className="main-container items-center flex justify-center w-full h-full">
          <Card
            hoverable
            style={{
              width: 500,
            }}
            cover={<img src={skyPicture} />}
            actions={[
              <IoArrowBack
                size={30}
                key={"/home"}
                className="text-red-500 ml-1 "
                onClick={(item) => {
                  navigate(item.key);
                }}
              />,
            ]}
          >
            <Meta
              title="404 Page Not Found Error"
              description="double check that you typed the page path correctly"
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default NotFound;
