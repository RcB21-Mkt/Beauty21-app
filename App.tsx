
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from './types';
import Login from './Login';
import Register from './Register';
import ParticipantDashboard from './ParticipantDashboard';
import ConsultantDashboard from './ConsultantDashboard';
import AdminDashboard from './AdminDashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('b21_session');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const handleLogin = (u: any) => {
    setUser(u);
    localStorage.setItem('b21_session', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('b21_session');
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-beauty text-magenta">Beauty 21...</div>;

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={
          user ? (
            user.role === UserRole.PARTICIPANT ? <ParticipantDashboard user={user} onLogout={handleLogout} /> :
            user.role === UserRole.CONSULTANT ? <ConsultantDashboard user={user} onLogout={handleLogout} /> :
            <AdminDashboard user={user} onLogout={handleLogout} />
          ) : <Navigate to="/login" />
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
