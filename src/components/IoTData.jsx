import React, { useEffect, useState } from "react";
import axios from "axios";

const IoTData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.json"); // Fetch data
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 100); // Refresh every 10s

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">IoT Sensor Data</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">Timestamp</th>
                <th className="p-2">Temperature (°C)</th>
                <th className="p-2">Humidity (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="p-2">{new Date(row.timestamp).toLocaleString()}</td>
                  <td className="p-2">{row.temperature}</td>
                  <td className="p-2">{row.humidity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IoTData;
