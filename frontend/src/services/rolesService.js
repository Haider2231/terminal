import axios from 'axios';

// URL base de la API para el servicio de roles
const API_BASE_URL = 'http://localhost:4004/api';

/**
 * Servicio para la gestión de roles de usuarios
 * @namespace rolesService
 */

/**
 * Obtiene todos los roles registrados en el sistema
 * @function getRoles
 * @memberof rolesService
 * @returns {Promise<Array<{
 *   id: number,
 *   nombre: string,
 *   descripcion: string,
 *   permisos: Array<string>,
 *   creado_en: string,
 *   actualizado_en: string
 * }>>} Lista de roles con sus detalles
 * @throws {Error} Cuando falla la conexión con el servidor
 * @example
 * try {
 *   const roles = await getRoles();
 *   console.log('Roles disponibles:', roles);
 * } catch (error) {
 *   console.error('Error al obtener roles:', error.message);
 * }
 */
export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw new Error('No se pudieron cargar los roles. Por favor intente más tarde.');
  }
};

/**
 * Crea un nuevo rol en el sistema
 * @function createRol
 * @memberof rolesService
 * @param {Object} rol - Datos del nuevo rol
 * @param {string} rol.nombre - Nombre del rol (debe ser único)
 * @param {string} rol.descripcion - Descripción del rol
 * @param {Array<string>} rol.permisos - Lista de permisos asociados
 * @returns {Promise<Object>} Rol creado con ID asignado
 * @throws {Error} Cuando faltan datos requeridos o el nombre ya existe
 */
export const createRol = async (rol) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/roles`, rol);
    return response.data;
  } catch (error) {
    console.error('Error al crear rol:', error);
    const errorMessage = error.response?.data?.message || 
                        'Error al crear el rol. Verifique los datos proporcionados.';
    throw new Error(errorMessage);
  }
};

/**
 * Actualiza los datos de un rol existente
 * @function updateRol
 * @memberof rolesService
 * @param {number} id - ID del rol a actualizar
 * @param {Object} rol - Nuevos datos del rol
 * @param {string} [rol.nombre] - Nuevo nombre (opcional)
 * @param {string} [rol.descripcion] - Nueva descripción (opcional)
 * @param {Array<string>} [rol.permisos] - Nueva lista de permisos (opcional)
 * @returns {Promise<Object>} Rol actualizado
 * @throws {Error} Cuando el rol no existe o hay conflictos de datos
 */
export const updateRol = async (id, rol) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/roles/${id}`, rol);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar rol ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al actualizar el rol';
    
    if (status === 404) message = 'El rol no existe';
    if (status === 409) message = 'El nombre del rol ya está en uso';
    if (error.response?.data?.message) message = error.response.data.message;
    
    throw new Error(message);
  }
};

/**
 * Elimina un rol del sistema
 * @function deleteRol
 * @memberof rolesService
 * @param {number} id - ID del rol a eliminar
 * @returns {Promise<Object>} Objeto con confirmación de eliminación
 * @throws {Error} Cuando el rol no existe o tiene usuarios asociados
 * @example
 * // Ejemplo de eliminación con manejo de errores
 * deleteRol(2)
 *   .then(() => alert('Rol eliminado correctamente'))
 *   .catch(error => alert(`Error: ${error.message}`));
 */
export const deleteRol = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar rol ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al eliminar el rol';
    
    if (status === 404) message = 'El rol no existe';
    if (status === 403) message = 'No se puede eliminar un rol con usuarios asignados';
    
    throw new Error(message);
  }
};