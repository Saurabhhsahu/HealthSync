import React from 'react';

const PatientProfile = ({ patient, darkMode }) => {
  return (
    <div className={`overflow-y-auto h-full px-6 py-4 rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`flex justify-between items-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
        <div>
          <h2 className="text-2xl font-semibold">Medical Records & History</h2>
          <p className='text-gray-500'>Conditions, allergies and surgeries</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center mb-6">
          <img
            src={patient.profileImage}
            alt={patient.name}
            className="w-20 h-20 rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              ID: {patient.id}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Age</p>
            <p>{patient.age} years</p>
          </div>
          <div>
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gender</p>
            <p>{patient.gender}</p>
          </div>
          <div>
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Blood Group</p>
            <p>{patient.bloodGroup}</p>
          </div>
          <div>
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Contact</p>
            <p>{patient.contact}</p>
          </div>
          <div className="col-span-2">
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
            <p>{patient.email}</p>
          </div>
          <div className="col-span-2">
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Emergency Contact</p>
            <p>{patient.emergencyContact.name} ({patient.emergencyContact.relation})</p>
            <p>{patient.emergencyContact.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;