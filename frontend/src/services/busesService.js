import axios from 'axios';

// URL base de la API
const API_BASE_URL = 'http://localhost:4004/api';

/**
 * Servicio para manejar operaciones relacionadas con buses
 * @namespace busesService
 */

/**
 * Obtiene todos los buses registrados
 * @function getBuses
 * @memberof busesService
 * @returns {Promise<Array>} Lista de buses
 * @throws {Error} Si ocurre un error en la petición
 */
export const getBuses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/buses`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener buses:', error);
    throw new Error('No se pudieron obtener los buses. Por favor intente más tarde.');
  }
};

/**
 * Crea un nuevo bus
 * @function createBus
 * @memberof busesService
 * @param {Object} bus - Datos del bus a crear
 * @param {string} bus.numero_bus - Número de identificación del bus
 * @param {string} bus.conductor - Nombre del conductor
 * @param {number} bus.empresa_id - ID de la empresa propietaria
 * @returns {Promise<Object>} Bus creado
 * @throws {Error} Si ocurre un error en la petición
 */
export const createBus = async (bus) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/buses`, bus);
    return response.data;
  } catch (error) {
    console.error('Error al crear el bus:', error);
    throw new Error('No se pudo crear el bus. Verifique los datos e intente nuevamente.');
  }
};

/**
 * Actualiza un bus existente
 * @function updateBus
 * @memberof busesService
 * @param {number} id - ID del bus a actualizar
 * @param {Object} bus - Nuevos datos del bus
 * @returns {Promise<Object>} Bus actualizado
 * @throws {Error} Si ocurre un error en la petición
 */
export const updateBus = async (id, bus) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/buses/${id}`, bus);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el bus:', error);
    throw new Error('No se pudo actualizar el bus. Verifique los datos e intente nuevamente.');
  }
};

/**
 * Elimina un bus existente
 * @function deleteBus
 * @memberof busesService
 * @param {number} id - ID del bus a eliminar
 * @returns {Promise<Object>} Respuesta de la operación
 * @throws {Error} Si ocurre un error en la petición
 */
export const deleteBus = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/buses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el bus:', error);
    throw new Error('No se pudo eliminar el bus. Por favor intente nuevamente.');
  }
};

/**
 * Obtiene los buses asociados a una ruta específica
 * @function getBusesPorRuta
 * @memberof busesService
 * @param {number} rutaId - ID de la ruta
 * @returns {Promise<Array>} Lista de buses para la ruta
 * @throws {Error} Si ocurre un error en la petición
 */
export const getBusesPorRuta = async (rutaId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/buses/ruta/${rutaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los buses por ruta:', error);
    throw new Error('No se pudieron obtener los buses para esta ruta. Por favor intente más tarde.');
  }
};