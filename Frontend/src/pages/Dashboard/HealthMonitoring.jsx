import React, { useState } from 'react';
import { useUser } from '../../context/userContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  HeartPulse,
  Activity,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const HealthMonitoring = ({ darkMode = false }) => {
  const [selectedMetrics, setSelectedMetrics] = useState({
    heartRate: true,
    bloodPressure: true
  });

  const { profile } = useUser();

  const healthData = profile?.healthMonitorings || [];

  // Calculate metrics
  const calculateMetricStats = (key) => {
    const values = healthData.map(item => item[key]);
    return {
      current: values[values.length - 1],
      average: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1),
      trend: values[values.length - 1] - values[0]
    };
  };

  const heartRateStats = calculateMetricStats('heartRate');
  const bloodPressureStats = calculateMetricStats('bloodPressure');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <p className="font-bold">{label}</p>
          {payload.map((entry) => (
            <p key={entry.dataKey} className="text-sm">
              {entry.dataKey === 'heartRate' ? 'Heart Rate' : 'Blood Pressure'}:
              <span className="font-semibold ml-2" style={{ color: entry.color }}>
                {entry.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const MetricToggle = ({ metric, label, icon: Icon }) => (
    <button
      onClick={() => setSelectedMetrics(prev => ({
        ...prev,
        [metric]: !prev[metric]
      }))}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${selectedMetrics[metric]
          ? (darkMode ? 'bg-blue-800 text-blue-200' : 'bg-black text-white')
          : (darkMode ? 'bg-gray-700 text-gray-400' : 'bg-transparent text-black border border-gray-300')
        }`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className={`rounded-lg shadow-md p-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <div>

          <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Health Monitoring
          </h2>
          <p className='text-gray-500'>Upcoming and past medical appointments</p>
        </div>
        <div className="flex space-x-2">
          <MetricToggle
            metric="heartRate"
            label="Heart Rate"
            icon={HeartPulse}
          />
          <MetricToggle
            metric="bloodPressure"
            label="Blood Pressure"
            icon={Activity}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer">
              <HeartPulse size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
              <span className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Heart Rate
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {heartRateStats.trend > 0 ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {heartRateStats.current} bpm
              </span>
            </div>
          </div>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Avg: {heartRateStats.average} bpm
          </p>
        </div>

        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity size={20} className={darkMode ? 'text-green-400' : 'text-green-600'} />
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Blood Pressure
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {bloodPressureStats.trend > 0 ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {bloodPressureStats.current} mmHg
              </span>
            </div>
          </div>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Avg: {bloodPressureStats.average} mmHg
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={healthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#444" : "#ccc"}
          />
          <XAxis
            dataKey="date"
            stroke={darkMode ? "#ddd" : "#333"}
          />
          <YAxis
            stroke={darkMode ? "#ddd" : "#333"}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {selectedMetrics.heartRate && (
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke="#ff7300"
              strokeWidth={2}
            />
          )}
          {selectedMetrics.bloodPressure && (
            <Line
              type="monotone"
              dataKey="bloodPressure"
              stroke="#387908"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthMonitoring;