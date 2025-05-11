import axios from 'axios';

const API_BASE_URL = 'http://localhost:4004/api';

/**
 * Servicio para la gestión de viajes
 * @namespace viajesService
 */

/**
 * Obtiene todos los viajes registrados
 * @function getViajes
 * @memberof viajesService
 * @returns {Promise<Array<{
 *   id: number,
 *   bus_id: number,
 *   ruta_id: number,
 *   salida: string,
 *   llegada: string,
 *   asientos_disponibles: number,
 *   precio: number,
 *   estado: 'programado' | 'en_progreso' | 'completado' | 'cancelado',
 *   creado_en: string,
 *   actualizado_en: string
 * }>>} Lista de viajes con sus detalles
 * @throws {Error} Cuando falla la conexión con el servidor
 */
export const getViajes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/viajes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener viajes:', error);
    throw new Error('No se pudieron cargar los viajes. Intente nuevamente.');
  }
};

/**
 * Crea un nuevo viaje
 * @function createViaje
 * @memberof viajesService
 * @param {Object} viaje - Datos del viaje a crear
 * @param {number} viaje.bus_id - ID del bus asignado (requerido)
 * @param {number} viaje.ruta_id - ID de la ruta (requerido)
 * @param {string} viaje.salida - Fecha/hora de salida (ISO 8601, requerido)
 * @param {string} viaje.llegada - Fecha/hora estimada de llegada (ISO 8601, requerido)
 * @param {number} [viaje.precio] - Precio del viaje (opcional)
 * @param {number} [viaje.asientos_disponibles] - Asientos disponibles (opcional)
 * @param {string} [viaje.estado='programado'] - Estado inicial del viaje (default: 'programado')
 * @returns {Promise<Object>} Viaje creado con ID asignado
 * @throws {Error} Cuando faltan datos requeridos o hay conflictos
 */
export const createViaje = async (viaje) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viajes`, viaje);
    return response.data;
  } catch (error) {
    console.error('Error al crear el viaje:', error);
    const errorMessage = error.response?.data?.message || 
                       'Error al crear el viaje. Verifique los datos.';
    throw new Error(errorMessage);
  }
};

/**
 * Actualiza los datos de un viaje existente
 * @function updateViaje
 * @memberof viajesService
 * @param {number} id - ID del viaje a actualizar
 * @param {Object} viaje - Nuevos datos del viaje
 * @param {number} [viaje.bus_id] - Nuevo ID de bus (opcional)
 * @param {string} [viaje.salida] - Nueva fecha/hora de salida (opcional)
 * @param {string} [viaje.llegada] - Nueva fecha/hora de llegada (opcional)
 * @param {number} [viaje.precio] - Nuevo precio (opcional)
 * @param {number} [viaje.asientos_disponibles] - Nuevo número de asientos (opcional)
 * @param {string} [viaje.estado] - Nuevo estado (opcional)
 * @returns {Promise<Object>} Viaje actualizado
 * @throws {Error} Cuando el viaje no existe o hay conflictos
 */
export const updateViaje = async (id, viaje) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/viajes/${id}`, viaje);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar viaje ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al actualizar el viaje';
    
    if (status === 404) message = 'El viaje no existe';
    if (status === 409) message = 'Conflicto con los datos proporcionados';
    
    throw new Error(message);
  }
};

/**
 * Elimina un viaje del sistema
 * @function deleteViaje
 * @memberof viajesService
 * @param {number} id - ID del viaje a eliminar
 * @returns {Promise<Object>} Confirmación de eliminación
 * @throws {Error} Cuando el viaje no existe o no se puede eliminar
 */
export const deleteViaje = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/viajes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar viaje ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al eliminar el viaje';
    
    if (status === 404) message = 'El viaje no existe';
    if (status === 403) message = 'No se puede eliminar un viaje con tickets vendidos';
    
    throw new Error(message);
  }
};

/**
 * Obtiene los viajes asociados a una ruta específica
 * @function getViajesPorRuta
 * @memberof viajesService
 * @param {number} rutaId - ID de la ruta
 * @returns {Promise<Array<Object>>} Lista de viajes para la ruta especificada
 * @throws {Error} Cuando la ruta no existe o hay error de conexión
 */
export const getViajesPorRuta = async (rutaId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/viajes/ruta/${rutaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener viajes para ruta ID ${rutaId}:`, error);
    const status = error.response?.status;
    let message = 'Error al obtener los viajes';
    
    if (status === 404) message = 'La ruta no existe';
    if (status === 400) message = 'ID de ruta inválido';
    
    throw new Error(message);
  }
};