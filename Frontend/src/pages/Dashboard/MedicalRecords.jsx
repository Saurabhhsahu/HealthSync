import React, { useState } from 'react';

const MedicalRecords = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('conditions');
  
  // Sample medical data
  const medicalData = {
    conditions: [
      { name: "Type 2 Diabetes", since: "2018", severity: "Moderate", notes: "Well controlled with medication" },
      { name: "Hypertension", since: "2020", severity: "Mild", notes: "Monitoring regularly" }
    ],
    allergies: [
      { name: "Penicillin", severity: "Severe", reaction: "Anaphylaxis" },
      { name: "Peanuts", severity: "Moderate", reaction: "Skin rash, breathing difficulties" }
    ],
    surgeries: [
      { procedure: "Appendectomy", date: "2015-03-15", hospital: "Metro General Hospital" },
      { procedure: "Knee Arthroscopy", date: "2019-11-22", hospital: "Orthopedic Specialty Center" }
    ]
  };

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`px-6 py-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white`}>
        <h2 className="text-xl font-semibold">Medical Records & History</h2>
      </div>
      
      <div className="border-b">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('conditions')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'conditions' 
              ? (darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600') 
              : (darkMode ? 'text-gray-400' : 'text-gray-500')
            } border-b-2 ${activeTab === 'conditions' ? 'border-blue-500' : 'border-transparent'}`}
          >
            Conditions
          </button>
          <button
            onClick={() => setActiveTab('allergies')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'allergies' 
              ? (darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600') 
              : (darkMode ? 'text-gray-400' : 'text-gray-500')
            } border-b-2 ${activeTab === 'allergies' ? 'border-blue-500' : 'border-transparent'}`}
          >
            Allergies
          </button>
          <button
            onClick={() => setActiveTab('surgeries')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'surgeries' 
              ? (darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600') 
              : (darkMode ? 'text-gray-400' : 'text-gray-500')
            } border-b-2 ${activeTab === 'surgeries' ? 'border-blue-500' : 'border-transparent'}`}
          >
            Past Surgeries
          </button>
        </nav>
      </div>
      
      <div className="p-4">
        {activeTab === 'conditions' && (
          <div>
            {medicalData.conditions.map((condition, index) => (
              <div key={index} className={`p-3 mb-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{condition.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    condition.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                    condition.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {condition.severity}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Since: {condition.since}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{condition.notes}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'allergies' && (
          <div>
            {medicalData.allergies.map((allergy, index) => (
              <div key={index} className={`p-3 mb-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{allergy.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    allergy.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                    allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {allergy.severity}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Reaction: {allergy.reaction}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'surgeries' && (
          <div>
            {medicalData.surgeries.map((surgery, index) => (
              <div key={index} className={`p-3 mb-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium">{surgery.procedure}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Date: {new Date(surgery.date).toLocaleDateString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Hospital: {surgery.hospital}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;