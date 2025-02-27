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
      <div className="mt-6 text-center text-gray-600 text-sm">
  <p>
    Developed by <span className="font-semibold">Karthik Jonnalagadda</span>  
    <a 
      href="https://github.com/jkarthik-2004" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline flex items-center justify-center gap-2"
    >
      <svg 
        className="w-4 h-4 inline-block" 
        fill="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.49 0-.24-.01-.86-.01-1.69-2.52.46-3.05-1.22-3.05-1.22-.41-1.04-1.01-1.32-1.01-1.32-.83-.57.06-.56.06-.56.91.06 1.39.93 1.39.93.82 1.39 2.16.99 2.69.76.08-.59.32-.99.58-1.22-2.01-.23-4.12-1-4.12-4.44 0-.98.35-1.79.93-2.42-.09-.23-.4-1.15.09-2.4 0 0 .75-.24 2.46.92a8.63 8.63 0 0 1 4.48 0c1.71-1.16 2.46-.92 2.46-.92.49 1.25.18 2.17.09 2.4.58.63.93 1.44.93 2.42 0 3.46-2.12 4.21-4.14 4.43.33.28.63.84.63 1.7 0 1.23-.01 2.21-.01 2.51 0 .27.18.59.69.49A10.008 10.008 0 0 0 22 12c0-5.52-4.48-10-10-10z"
        />
      </svg>
      <span>GitHub</span>
    </a>
  </p>
</div>

    </div>
  );
};

export default IoTData;
