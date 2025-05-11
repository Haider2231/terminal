// Importa React para poder usar JSX
import React from "react";
// Importa el logo desde la carpeta de assets
import logo from "../assets/terminal-logo.png";

// Componente funcional que representa el encabezado de la aplicación
const Header = () => {
  return (
    // Contenedor principal del encabezado con clase personalizada
    <header className="custom-header">
      <div className="header-container">
        {/* Logo de la aplicación */}
        <img src={logo} alt="Logo" className="logo" />

        {/* Grupo de botones a la derecha del encabezado */}
        <div className="button-group">
          <button className="header-button">Sign up</button>
          <button className="header-button">Register</button>
        </div>
      </div>
    </header>
  );
};

// Exporta el componente para que pueda ser usado en otras partes de la app
export default Header;
