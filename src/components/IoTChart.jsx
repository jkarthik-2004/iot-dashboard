import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const IoTChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.json");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">IoT Data Visualization</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temperature Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">Temperature Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Humidity Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">Humidity Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IoTChart;
