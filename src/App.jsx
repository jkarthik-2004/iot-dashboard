import React from "react";
import IoTChart from "./components/IoTChart";
import IoTData from "./components/IoTData";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">IoT Data Dashboard</h1>
      <div className="w-11/12 md:w-3/4">
        <IoTData />
        <IoTChart />
      </div>
    </div>
  );
}

export default App;
