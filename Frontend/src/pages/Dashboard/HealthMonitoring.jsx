import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HealthMonitoring = ({ darkMode }) => {
  // Sample health monitoring data
  const healthData = [
    { date: "Feb 20", heartRate: 72, bloodPressure: 120 },
    { date: "Feb 21", heartRate: 75, bloodPressure: 118 },
    { date: "Feb 22", heartRate: 78, bloodPressure: 122 },
    { date: "Feb 23", heartRate: 74, bloodPressure: 119 },
    { date: "Feb 24", heartRate: 76, bloodPressure: 121 },
    { date: "Feb 25", heartRate: 73, bloodPressure: 117 },
  ];

  return (
    <div className={`rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h2 className="text-lg font-semibold mb-3">Health Monitoring</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={healthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#ccc"} />
          <XAxis dataKey="date" stroke={darkMode ? "#ddd" : "#333"} />
          <YAxis stroke={darkMode ? "#ddd" : "#333"} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="heartRate" stroke="#ff7300" strokeWidth={2} />
          <Line type="monotone" dataKey="bloodPressure" stroke="#387908" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthMonitoring;
