import React, { useEffect, useState } from "react";
import { Card, Space, Typography } from "antd";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Chart from "../components/Chart";


const Dashboard = () => {
  return (
    <>
      <div className="dashboard-full-container p-5 flex gap-5">
        <CardList 
          title={"Revenue"}
          inc={"$ 2555"}
          dec={"-12,5"}
          icon={{ dec: <FaArrowDown fill="red" /> }}
          message={"Compare to last Month"}
        />

        <CardList
          title={"Most Orders"}
          inc={"$ 4555"}
          dec={"-11,5"}
          icon={{ dec: <FaArrowDown fill="red" /> }}
          message={"Compare to last Month"}
        />
        <CardList
          title={" Sales"}
          inc={"$ 4555"}
          dec={"+ 11,5"}
          icon={{ inc: <FaArrowUp fill="green" /> }}
          message={"Compare to last Month"}
        />
      </div>
      <div className="chart-container p-5">
      <Chart/>
      </div>
    </>
  );
};

const CardList = ({ title, inc, dec, icon, message }) => {
  return (
    <>
      <div className="cardlist-container ">
        <Space direction="vertical" size={"large"}>
          <Card hoverable title={title} style={{ minWidth: 330 }}>
            <div className="text-content  flex gap-10 items-center">
              <Typography.Title level={3}>{inc}</Typography.Title>
              <span className="text-gray-600 text-base mb-1.5">{dec}</span>
              <span className="my-2.5 p-2.5 rounded-full bg-slate-50">
                {icon.dec}
                {icon.inc}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{message}</p>
          </Card>
        </Space>
      </div>
     
    </>
  );
};
export default Dashboard;
