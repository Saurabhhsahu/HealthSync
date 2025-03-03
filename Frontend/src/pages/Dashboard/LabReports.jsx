import React, { useState,useEffect} from 'react';
import {useUser} from '../../context/userContext.jsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LabReports = ({ darkMode }) => {
  const {getProfileDetails} = useUser();
  const [glucoseData,setGlucoseData] = useState('')

  // Sample lab report data
  const labReports = [
    { id: 1, test: "Complete Blood Count", date: "2025-02-15", status: "Normal", file: "cbc_report_feb2025.pdf" },
    { id: 2, test: "Blood Glucose", date: "2025-02-15", status: "Elevated", file: "glucose_feb2025.pdf" },
    { id: 3, test: "Lipid Profile", date: "2025-01-10", status: "Borderline", file: "lipid_jan2025.pdf" }
  ];

  // Glucose trend data
  useEffect(() => {
    const fetchGlucoseData = async () => {
      const data = await getProfileDetails("glucoseTrends");
      if (data) {
        setGlucoseData(data); // Store data in state
      }
    };
    fetchGlucoseData();
  }, []);
  

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`px-6 py-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white`}>
        <h2 className="text-xl font-semibold">Lab Reports & Test Results</h2>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Blood Glucose Trend
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={glucoseData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                <XAxis dataKey="month" stroke={darkMode ? '#aaa' : '#666'} />
                <YAxis stroke={darkMode ? '#aaa' : '#666'} />
                <Tooltip contentStyle={darkMode ? { backgroundColor: '#333', borderColor: '#555' } : {}} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  dot={{ fill: '#f59e0b', r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Recent Lab Reports
        </h3>
        <div className="space-y-3">
          {labReports.map((report) => (
            <div 
              key={report.id} 
              className={`p-3 rounded-lg flex justify-between items-center ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div>
                <h4 className="font-medium">{report.test}</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {new Date(report.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <span className={`inline-block px-2 py-1 text-xs rounded mr-3 ${
                  report.status === 'Normal' 
                    ? (darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800')
                    : report.status === 'Elevated'
                    ? (darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800')
                    : (darkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                }`}>
                  {report.status}
                </span>
                <button className={`p-1 rounded ${
                  darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabReports;