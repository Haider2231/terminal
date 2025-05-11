import axios from 'axios';

const API_BASE_URL = 'http://localhost:4004/api';

/**
 * Servicio para la gestión de usuarios
 * @namespace usuariosService
 */

/**
 * Obtiene todos los usuarios registrados
 * @function getUsuarios
 * @memberof usuariosService
 * @returns {Promise<Array<{
 *   id: number,
 *   nombre: string,
 *   email: string,
 *   rol_id: number,
 *   activo: boolean,
 *   creado_en: string,
 *   actualizado_en: string
 * }>>} Lista de usuarios
 * @throws {Error} Cuando falla la conexión con el servidor
 */
export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('No se pudieron cargar los usuarios. Intente nuevamente.');
  }
};

/**
 * Crea un nuevo usuario
 * @function createUsuario
 * @memberof usuariosService
 * @param {Object} usuario - Datos del usuario a crear
 * @param {string} usuario.nombre - Nombre completo (requerido)
 * @param {string} usuario.email - Email (requerido)
 * @param {string} usuario.contraseña - Contraseña (requerido)
 * @param {number} [usuario.rol_id=2] - Rol del usuario (default: 2 - usuario normal)
 * @returns {Promise<Object>} Usuario creado con ID asignado
 * @throws {Error} Cuando faltan datos requeridos o el email ya existe
 */
export const createUsuario = async (usuario) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, usuario);
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    const errorMessage = error.response?.data?.message || 
                       'Error al crear el usuario. Verifique los datos.';
    throw new Error(errorMessage);
  }
};

/**
 * Actualiza los datos de un usuario existente
 * @function updateUsuario
 * @memberof usuariosService
 * @param {number} id - ID del usuario a actualizar
 * @param {Object} usuario - Nuevos datos del usuario
 * @param {string} [usuario.nombre] - Nuevo nombre (opcional)
 * @param {string} [usuario.email] - Nuevo email (opcional)
 * @param {string} [usuario.contraseña] - Nueva contraseña (opcional)
 * @param {number} [usuario.rol_id] - Nuevo rol (opcional)
 * @param {boolean} [usuario.activo] - Nuevo estado (opcional)
 * @returns {Promise<Object>} Usuario actualizado
 * @throws {Error} Cuando el usuario no existe o hay conflictos
 */
export const updateUsuario = async (id, usuario) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/usuarios/${id}`, usuario);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al actualizar el usuario';
    
    if (status === 404) message = 'El usuario no existe';
    if (status === 409) message = 'El email ya está registrado';
    
    throw new Error(message);
  }
};

/**
 * Elimina un usuario del sistema
 * @function deleteUsuario
 * @memberof usuariosService
 * @param {number} id - ID del usuario a eliminar
 * @returns {Promise<Object>} Confirmación de eliminación
 * @throws {Error} Cuando el usuario no existe o no se puede eliminar
 */
export const deleteUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar usuario ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al eliminar el usuario';
    
    if (status === 404) message = 'El usuario no existe';
    if (status === 403) message = 'No se puede eliminar un usuario con tickets asociados';
    
    throw new Error(message);
  }
};

/**
 * Autentica a un usuario
 * @function loginUsuario
 * @memberof usuariosService
 * @param {string} email - Email del usuario
 * @param {string} contraseña - Contraseña del usuario
 * @returns {Promise<Object>} Objeto con token de autenticación y datos del usuario
 * @throws {Error} Cuando las credenciales son inválidas
 */
export const loginUsuario = async (email, contraseña) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios/login`, { email, contraseña });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    const status = error.response?.status;
    let message = 'Error al iniciar sesión';
    
    if (status === 401) message = 'Credenciales inválidas';
    if (status === 404) message = 'Usuario no encontrado';
    
    throw new Error(message);
  }
};

/**
 * Registra un nuevo usuario (alias de createUsuario)
 * @function registerUsuario
 * @memberof usuariosService
 * @param {Object} usuario - Datos del nuevo usuario
 * @param {string} usuario.nombre - Nombre completo (requerido)
 * @param {string} usuario.email - Email (requerido)
 * @param {string} usuario.contraseña - Contraseña (requerido)
 * @returns {Promise<Object>} Usuario registrado
 * @see createUsuario
 */
export const registerUsuario = async (usuario) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, usuario);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    const errorMessage = error.response?.data?.message || 
                       'Error al registrar el usuario. Verifique los datos.';
    throw new Error(errorMessage);
  }
};