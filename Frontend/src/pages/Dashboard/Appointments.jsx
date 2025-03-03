import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext';

const Appointments = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  // const [appointments, setAppointments] = useState([]);
  const { profile } = useUser();

  const appointments = profile?.appointments || [];

  // Separate upcoming and past appointments dynamically
  const upcomingAppointments = appointments.filter(appointment => !appointment.prescription);
  const pastAppointments = appointments.filter(appointment => appointment.prescription);

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`px-6 py-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white`}>
        <h2 className="text-xl font-semibold">Appointments & Consultations</h2>
      </div>

      <div className="border-b">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'upcoming' ? 'border-blue-500 text-blue-600' : 'text-gray-500'} border-b-2`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'past' ? 'border-blue-500 text-blue-600' : 'text-gray-500'} border-b-2`}
          >
            Past Consultations
          </button>
        </nav>
      </div>

      <div className="p-4">
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{appointment.doctor}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{appointment.department}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </div>
                      <span className={`inline-block px-2 py-1 text-xs rounded mt-1 ${appointment.isOnline
                        ? (darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800')
                        : (darkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-800')}`}>
                        {appointment.isOnline ? 'Online' : 'In-person'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Location: {appointment.location}
                    </p>
                    {appointment.isOnline && (
                      <div className="mt-2">
                        <a href={appointment.link} target="_blank" rel="noopener noreferrer"
                          className={`inline-block px-3 py-1 text-sm font-medium rounded ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                          Join Meeting
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming appointments.</p>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment) => (
                <div key={appointment.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{appointment.doctor}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{appointment.department}</p>
                    </div>
                    <div className="text-right text-sm">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Diagnosis:</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{appointment.diagnosis}</p>

                    <h4 className={`text-sm font-medium mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Prescription:</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{appointment.prescription}</p>

                    <div className="mt-2 flex space-x-2">
                      <button className={`px-3 py-1 text-sm font-medium rounded ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                        View Full Report
                      </button>
                      <button className={`px-3 py-1 text-sm font-medium rounded ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No past consultations.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
