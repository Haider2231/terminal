import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css'; // Importación del archivo CSS principal

/**
 * Punto de entrada principal de la aplicación React
 * 
 * Responsabilidades:
 * - Monta la aplicación en el elemento DOM con id 'root'
 * - Habilita el modo estricto de React para detectar problemas potenciales
 * - Importa los estilos globales de la aplicación
 * 
 * @file Entry point de la aplicación
 * @module src/main.jsx
 */

// Creación del root de React en el elemento con id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizado de la aplicación dentro de React StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);