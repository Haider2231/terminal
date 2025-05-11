// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mapa from './components/Mapa';
import Login from './pages/Login';
import Register from './pages/Register';
import ComprarTicket from './pages/ComprarTicket';
import { UserProvider } from './context/UserContext';

/**
 * Componente principal de la aplicación
 * 
 * Configura:
 * - Proveedor de contexto de usuario
 * - Enrutamiento principal
 * - Layout base de la aplicación
 * 
 * @component
 * @returns {JSX.Element} Estructura base de la aplicación
 */
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta para el mapa de viajes */}
          <Route path="/mapa" element={<Mapa />} />
          
          {/* Ruta para inicio de sesión */}
          <Route path="/login" element={<Login />} />
          
          {/* Ruta para registro de nuevos usuarios */}
          <Route path="/register" element={<Register />} />
          
          {/* Ruta para compra de tickets */}
          <Route path="/comprar" element={<ComprarTicket />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;