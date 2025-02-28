import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard/PatientDashboard'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App