import React, { useState } from 'react';
import PatientProfile from './PatientProfile';
import MedicalRecords from './MedicalRecords';
import Appointments from './Appointments';
import LabReports from './LabReports';
import Medications from './Medications';
import HealthMonitoring from './HealthMonitoring';
import Insurance from './Insurance';
import ThemeToggle from './ThemeToggle';

const PatientDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sample patient data
  const patientData = {
    id: "PT-10456",
    name: "John Doe",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    contact: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    emergencyContact: {
      name: "Jane Doe",
      relation: "Spouse",
      phone: "+1 (555) 987-6543"
    },
    profileImage: "/api/placeholder/120/120"
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Patient Dashboard</h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Row */}
          <div className="col-span-1 h-100">
            <PatientProfile patient={patientData} darkMode={darkMode} />
          </div>
          <div className="col-span-2 h-100">
            <Appointments darkMode={darkMode} />
          </div>

          {/* Second Row */}
          <div className="col-span-1 h-100">
            <MedicalRecords darkMode={darkMode} />
          </div>
          <div className="col-span-1 h-100">
            <LabReports darkMode={darkMode} />
          </div>
          <div className="col-span-1 h-100">
            <Medications darkMode={darkMode} />
          </div>

          {/* Third Row */}
          <div className="col-span-1 h-100">
            <Insurance darkMode={darkMode} />
          </div>
          <div className="col-span-2 h-100">
            <HealthMonitoring darkMode={darkMode} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;