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
    <div className={`px-6 py-4 rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`flex justify-between items-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
        <div>
          <h2 className="text-2xl font-semibold">Medical Records & History</h2>
          <p className='text-gray-500'>Conditions, allergies and surgeries</p>
        </div>
      </div>

      <div className="mt-4 bg-gray-100 inline-block p-2 rounded-lg">
        <nav className="flex space-x-2">
          {["conditions", "allergies", "surgeries"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 text-sm font-bold rounded-lg transition ${
                activeTab === tab ? 'bg-white text-black' : 'bg-transparent text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === 'conditions' && (
          <div>
            {medicalData.conditions.map((condition, index) => (
              <div key={index} className="p-5 mb-3 rounded-lg border border-gray-200 bg-white text-black">
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
                <p className="text-sm text-gray-600">Since: {condition.since}</p>
                <p className="text-sm text-gray-600">{condition.notes}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'allergies' && (
          <div>
            {medicalData.allergies.map((allergy, index) => (
              <div key={index} className="p-3 mb-3 rounded-lg border border-gray-200 bg-white text-black">
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
                <p className="text-sm text-gray-600">Reaction: {allergy.reaction}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'surgeries' && (
          <div>
            {medicalData.surgeries.map((surgery, index) => (
              <div key={index} className="p-3 mb-3 rounded-lg border border-gray-200 bg-white text-black">
                <h3 className="font-medium">{surgery.procedure}</h3>
                <p className="text-sm text-gray-600">
                  Date: {new Date(surgery.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
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