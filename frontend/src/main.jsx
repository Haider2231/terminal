// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css'; // <- Aquí se importa el archivo CSS global para la aplicación

/**
 * Punto de entrada principal de la aplicación.
 * 
 * - Este archivo es el encargado de renderizar el componente raíz (`App`) en el contenedor del DOM con id `root`.
 * - El archivo CSS (`styles.css`) se importa para aplicar los estilos globales a la aplicación.
 * 
 * `React.StrictMode` se utiliza para activar un modo de desarrollo que ayuda a detectar problemas potenciales en la aplicación.
 * 
 * @returns {JSX.Element} El componente raíz de la aplicación, que se renderiza en el DOM.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
