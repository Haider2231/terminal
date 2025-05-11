import React, { useState } from "react";
import "../styles.css";
import Header from "../components/Header";
import { registerUsuario } from "../services/usuariosService";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

/**
 * Componente de Registro - Maneja el registro de nuevos usuarios
 *
 * Características:
 * - Recopila información del usuario (nombre, email, contraseña)
 * - Envía datos de registro al backend
 * - Maneja casos de éxito/error en el registro
 * - Inicia sesión automáticamente al registrar exitosamente
 * - Redirige a la página principal después del registro
 */
const Register = () => {
  // Estado del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  // Hooks para navegación y contexto de usuario
  const navigate = useNavigate();
  const { setUser } = useUser();

  /**
   * Maneja el envío del formulario de registro
   * @param {React.FormEvent} e - Evento del formulario
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    // Preparar datos del usuario con rol predeterminado (1 = usuario normal)
    const usuario = {
      nombre,
      email,
      contraseña,
      rol_id: 1, // ID de rol predeterminado
    };

    try {
      // Enviar datos de registro al backend
      const data = await registerUsuario(usuario);

      // Mostrar mensaje de éxito
      alert("Usuario registrado exitosamente");

      // Guardar datos de usuario en localStorage y contexto
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      // Redirigir a página principal
      navigate("/");
    } catch (error) {
      // Mostrar mensaje de error
      alert("Error al registrar usuario");
      console.error("Error en registro:", error);
    }
  };

  return (
    <>
      {/* Header con botones de autenticación ocultos */}
      <Header hideAuthButtons={true} />

      {/* Formulario de Registro */}
      <form
        onSubmit={handleRegister}
        className="form"
        aria-label="Formulario de registro"
      >
        <h1 className="form-title">Crea tu cuenta</h1>

        {/* Input de Nombre */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            aria-required="true"
            aria-label="Nombre completo"
          />
          <span aria-hidden="true">
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        {/* Input de Email */}
        <div className="input-container">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-label="Correo electrónico"
          />
          <span aria-hidden="true">
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        {/* Input de Contraseña */}
        <div className="input-container">
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            minLength="6"
            aria-required="true"
            aria-label="Contraseña"
          />
          <span aria-hidden="true">
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        {/* Botón de Envío */}
        <button
          className="header-button"
          type="submit"
          aria-label="Registrar cuenta"
        >
          Registrarse
        </button>

        {/* Enlace de Login */}
        <p className="signup-link">
          ¿Ya tienes una cuenta?
          <a href="/login" aria-label="Iniciar sesión">
            Inicia sesión
          </a>
        </p>
      </form>
    </>
  );
};

export default Register;
