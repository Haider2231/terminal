// frontend/src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/terminal-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <header className="custom-header">
      <div className="header-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="button-group">
          {isAuthenticated ? (
            <button className="header-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="header-button" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="header-button" onClick={() => navigate('/register')}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;