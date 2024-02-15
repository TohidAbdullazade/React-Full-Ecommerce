import { Card,  Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { data } from "./ChartData";

const Chart = () => {
  const [loading, setLoading] = useState(true); // STATE

  // ===> MAKE AN TIMEOUT PROSES <===
   useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="chart-container">
      {loading ? (
        <Spin spinning />
      ) : (
        <>
          <Card
            hoverable
            loading={loading}
            title="Sales"
            style={{ textAlign: "center" }}
          >
            
            <ResponsiveContainer width={"100%"} height={"100%"} aspect={4 / 1}>
              <LineChart data={data}>
                <XAxis dataKey={"name"} />
                <YAxis />
                <Line type={"monotone"} dataKey={"orders"} stroke="red" />
                <Line type={"monotone"} dataKey={"sales"} stroke="green" />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="gray" strokeDasharray={"5 5"} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}
    </div>
  );
};

export default Chart;
