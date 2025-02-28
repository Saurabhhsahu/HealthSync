import React from 'react';

const Medications = ({ darkMode }) => {
  // Sample medications data
  const medications = [
    { 
      id: 1, 
      name: "Metformin", 
      dosage: "500mg", 
      frequency: "Twice daily with meals", 
      startDate: "2023-10-15",
      refillDate: "2025-03-15",
      instructions: "Take with food to reduce stomach upset"
    },
    { 
      id: 2, 
      name: "Lisinopril", 
      dosage: "10mg", 
      frequency: "Once daily", 
      startDate: "2023-12-01",
      refillDate: "2025-03-01",
      instructions: "Take in the morning"
    },
    { 
      id: 3, 
      name: "Atorvastatin", 
      dosage: "20mg", 
      frequency: "Once daily", 
      startDate: "2024-01-10",
      refillDate: "2025-04-10",
      instructions: "Take at night"
    }
  ];

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`px-6 py-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white`}>
        <h2 className="text-xl font-semibold">Medications & Prescriptions</h2>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {medications.map((medication) => {
            // Calculate days until refill
            const today = new Date();
            const refillDate = new Date(medication.refillDate);
            const daysUntilRefill = Math.ceil((refillDate - today) / (1000 * 60 * 60 * 24));
            
            return (
              <div 
                key={medication.id} 
                className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{medication.name} {medication.dosage}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {medication.frequency}
                    </p>
                  </div>
                  <div>
                    {daysUntilRefill <= 7 ? (
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'
                      }`}>
                        Refill in {daysUntilRefill} days
                      </span>
                    ) : (
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'
                      }`}>
                        Refill in {daysUntilRefill} days
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-medium">Started:</span> {new Date(medication.startDate).toLocaleDateString()}
                  </p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-medium">Instructions:</span> {medication.instructions}
                  </p>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <button className={`px-3 py-1 text-sm font-medium rounded ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}>
                    Set Reminder
                  </button>
                  <button className={`px-3 py-1 text-sm font-medium rounded ${
                    darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                  } ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                    Request Refill
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Medications;