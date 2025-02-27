import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const IoTChart = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <></>
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
      <h3 className="text-xl font-semibold mb-4">Temperature & Humidity Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} 
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#ff7300" strokeWidth={2} />
          <Line type="monotone" dataKey="humidity" stroke="#387908" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IoTChart;
