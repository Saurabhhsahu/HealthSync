import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard/PatientDashboard';
import Auth from './pages/Auth';

import { useUser } from './context/userContext';

function App() {
  const { token } = useUser();

  return (
    <Routes>
      {!token ? (
        <Route path="*" element={<Navigate to="/auth" replace />} />
      ) : (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
      
      {/* Explicitly define Auth route */}
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
