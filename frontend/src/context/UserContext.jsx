import React, { createContext, useContext, useState, useEffect } from 'react';

// Creación del contexto para manejar el estado del usuario
const UserContext = createContext();

/**
 * Proveedor del contexto de usuario que maneja:
 * - Autenticación del usuario
 * - Persistencia en localStorage
 * - Funciones de login/logout
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 */
export const UserProvider = ({ children }) => {
  // Estado para almacenar los datos del usuario
  const [user, setUser] = useState(null);

  // Efecto para cargar el usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  /**
   * Función para cerrar sesión:
   * - Elimina los datos del usuario de localStorage
   * - Limpia el estado del usuario
   */
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Limpiar token si existe
    setUser(null);
  };

  // Proveedor del contexto que expone el estado y las funciones
  return (
    <UserContext.Provider value={{ 
      user,           // Datos del usuario actual
      setUser,        // Función para actualizar el usuario
      logout          // Función para cerrar sesión
    }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de usuario
 * @returns {Object} Contexto del usuario con { user, setUser, logout }
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};