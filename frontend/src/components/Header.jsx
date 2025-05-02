import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/terminal-logo.png";
import { useUser } from '../context/UserContext';

const Header = ({ hideAuthButtons }) => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    console.log('User in Header:', user);
  }, [user]);

  return (
    <header className="custom-header">
      <div className="header-container">
        <img src={logo} alt="Logo" className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        {!hideAuthButtons && (
          <div className="button-group">
            {user ? (
              <>
                <span className="header-username">{user.nombre}</span>
                <button onClick={logout} className="header-button">Logout</button>
              </>
            ) : (
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