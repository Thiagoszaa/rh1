import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vagas from './pages/Vagas';
import Informacoes from './pages/Informacoes';
import RegistrarPonto from './pages/RegistrarPonto';
import JustificarFalta from './pages/JustificarFalta';
import Colaboradores from './pages/Colaboradores';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? 
                <Login onLogin={handleLogin} /> : 
                <Navigate to="/dashboard" replace />
            } 
          />
          
          {isAuthenticated ? (
            <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="vagas" element={<Vagas />} />
              <Route path="informacoes" element={<Informacoes />} />
              <Route path="registrar-ponto" element={<RegistrarPonto />} />
              <Route path="justificar-falta" element={<JustificarFalta />} />
              <Route path="colaboradores" element={<Colaboradores />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

