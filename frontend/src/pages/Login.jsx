import React, { useState } from "react";
import Header from "../components/Header";
import "../styles.css";
import { loginUsuario } from '../services/usuariosService';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';

/**
 * Componente de Login - Maneja la autenticación de usuarios
 * 
 * Características:
 * - Autenticación por email y contraseña
 * - Manejo de tokens JWT
 * - Gestión del contexto de usuario
 * - Redirección a página principal después de login exitoso
 */
const Login = () => {
  // Estado del formulario
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  
  // Hooks para navegación y contexto de usuario
  const navigate = useNavigate();
  const { setUser } = useUser();

  /**
   * Maneja el envío del formulario de login
   * @param {React.FormEvent} e - Evento del formulario
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Autenticar usuario con el servicio backend
      const data = await loginUsuario(email, contraseña);
      
      // Decodificar token JWT para obtener información del usuario
      const decodedToken = jwtDecode(data.token);
  
      // Crear objeto de usuario desde el token
      const user = {
        id: decodedToken.id,
        email: decodedToken.email,
        token: data.token
      };
  
      // Persistir usuario en localStorage y contexto
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      // Redirigir a página principal
      navigate('/');
    } catch (error) {
      alert('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en login:', error);
    }
  };

  return (
    <>
      {/* Header con botones de autenticación ocultos */}
      <Header hideAuthButtons={true} />
      
      {/* Formulario de Login */}
      <form onSubmit={handleLogin} className="form" aria-label="Formulario de login">
        <p className="form-title">Inicia sesión en tu cuenta</p>
        
        {/* Input de Email */}
        <div className="input-container">
          <input
            placeholder="Ingresa tu email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-label="Dirección de email"
          />
          <span aria-hidden="true">
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
        </div>
        
        {/* Input de Contraseña */}
        <div className="input-container">
          <input
            placeholder="Ingresa tu contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            aria-required="true"
            aria-label="Contraseña"
          />
          <span aria-hidden="true">
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
        </div>
        
        {/* Botón de Envío */}
        <button className="header-button" type="submit" aria-label="Iniciar sesión">
          Iniciar Sesión
        </button>
        
        {/* Enlace de Registro */}
        <p className="signup-link">
          ¿No tienes cuenta?
          <a href="/register" aria-label="Registrarse">Regístrate</a>
        </p>
      </form>
    </>
  );
};

export default Login;