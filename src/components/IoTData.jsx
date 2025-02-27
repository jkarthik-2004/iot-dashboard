import React, { useEffect, useState } from "react";
import axios from "axios";
import IoTChart from "./IoTChart";

const IoTData = () => {
  const [fullData, setFullData] = useState([]); // Stores 100 rows
  const [displayData, setDisplayData] = useState([]); // Stores 10 random rows
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.json");
        console.log("Fetched Data:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setFullData(response.data);
          setLoading(false);
        } else {
          console.error("Invalid data format:", response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (fullData.length === 0) return;

    const interval = setInterval(() => {
      const randomData = fullData.sort(() => 0.5 - Math.random()).slice(0, 10);
      setDisplayData(randomData);
    }, 2000);

    return () => clearInterval(interval);
  }, [fullData]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">IoT Sensor Data</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : fullData.length === 0 ? (
        <p className="text-center text-red-500">Error: No IoT data available.</p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4">Latest IoT Readings</h3>
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 border">Timestamp</th>
                  <th className="p-3 border">Temperature (°C)</th>
                  <th className="p-3 border">Humidity (%)</th>
                </tr>
              </thead>
              <tbody>
                {displayData.length > 0 ? (
                  displayData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="p-3 border">{new Date(row.timestamp).toLocaleString()}</td>
                      <td className="p-3 border">{row.temperature}</td>
                      <td className="p-3 border">{row.humidity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-3 text-center text-gray-500">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Chart Component */}
          <IoTChart data={displayData} />
        </>
      )}
    </div>
  );
};

export default IoTData;
