import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';  
import { useState } from 'react';
import DataTable from './pages/DashboardMenu';
import RegisterForm from './pages/Register';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/dashboard" element={isAuthenticated ? <DataTable /> : <Login onLogin={handleLogin} />} />
      <Route path="/register" element={
        isAuthenticated ? <RegisterForm /> : <Navigate to="/" />
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
