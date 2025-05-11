import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/terminal-logo.png";
import { useUser } from '../context/UserContext';

/**
 * Componente de cabecera que muestra el logo y botones de autenticación
 * @param {boolean} hideAuthButtons - Indica si se deben ocultar los botones de autenticación
 */
const Header = ({ hideAuthButtons }) => {
  const navigate = useNavigate();
  const { user, logout } = useUser(); // Obtiene usuario y función logout del contexto

  // Efecto para monitorear cambios en el estado del usuario
  useEffect(() => {
    console.log('User in Header:', user);
  }, [user]);

  return (
    <header className="custom-header">
      <div className="header-container">
        {/* Logo clickeable que redirige a la página principal */}
        <img 
          src={logo} 
          alt="Logo" 
          className="logo" 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }} 
        />
        
        {/* Renderizado condicional de botones de autenticación */}
        {!hideAuthButtons && (
          <div className="button-group">
            {user ? (
              // Mostrar cuando hay usuario logueado
              <>
                <span className="header-username">{user.nombre}</span>
                <button onClick={logout} className="header-button">Logout</button>
              </>
            ) : (
              // Mostrar cuando no hay usuario logueado
              <>
                <Link to="/login" className="header-button">Sign in</Link>
                <Link to="/register" className="header-button">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;