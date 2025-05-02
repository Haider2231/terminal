// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mapa from './components/Mapa';
import Login from './pages/Login';
import Register from './pages/Register';
import ComprarTicket from './pages/ComprarTicket'; // NUEVO
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/comprar" element={<ComprarTicket />} /> {/* NUEVO */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;