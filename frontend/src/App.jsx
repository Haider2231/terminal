// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mapa from './components/Mapa';

/**
 * Componente principal de la aplicación que gestiona las rutas de la aplicación.
 * 
 * - Usa `react-router-dom` para manejar la navegación entre las distintas vistas de la aplicación.
 * - Define dos rutas principales:
 *   1. `/` para la vista de inicio (`Home`).
 *   2. `/mapa` para la vista del mapa (`Mapa`).
 * 
 * @returns {JSX.Element} Componente de la aplicación con las rutas configuradas.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal que renderiza la vista de inicio */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para ver el mapa asociado a una ruta específica */}
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </Router>
  );
}

export default App;
