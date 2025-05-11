import axios from 'axios';

// URL base de la API para el servicio de relaciones ruta-municipio
const API_BASE_URL = 'http://localhost:4004/api';

/**
 * Servicio para la gestión de relaciones entre rutas y municipios
 * @namespace rutaMunicipioService
 */

/**
 * Obtiene todas las relaciones ruta-municipio registradas
 * @function getRutaMunicipios
 * @memberof rutaMunicipioService
 * @returns {Promise<Array<{
 *   id: number,
 *   ruta_id: number,
 *   municipio_id: number,
 *   orden: number,
 *   es_origen: boolean,
 *   es_destino: boolean,
 *   creado_en: string,
 *   actualizado_en: string
 * }>>} Lista de relaciones ruta-municipio
 * @throws {Error} Cuando falla la conexión con el servidor
 * @example
 * try {
 *   const relaciones = await getRutaMunicipios();
 *   console.log('Relaciones ruta-municipio:', relaciones);
 * } catch (error) {
 *   console.error('Error:', error.message);
 * }
 */
export const getRutaMunicipios = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ruta_municipios`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener relaciones ruta-municipio:', error);
    throw new Error('No se pudieron cargar las relaciones ruta-municipio. Intente nuevamente.');
  }
};

/**
 * Crea una nueva relación ruta-municipio
 * @function createRutaMunicipio
 * @memberof rutaMunicipioService
 * @param {Object} rutaMunicipio - Datos de la relación a crear
 * @param {number} rutaMunicipio.ruta_id - ID de la ruta (requerido)
 * @param {number} rutaMunicipio.municipio_id - ID del municipio (requerido)
 * @param {number} [rutaMunicipio.orden] - Orden en la ruta (opcional)
 * @param {boolean} [rutaMunicipio.es_origen] - Si es punto de origen (default: false)
 * @param {boolean} [rutaMunicipio.es_destino] - Si es punto de destino (default: false)
 * @returns {Promise<Object>} Relación creada con ID asignado
 * @throws {Error} Cuando faltan datos requeridos o hay conflictos
 */
export const createRutaMunicipio = async (rutaMunicipio) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ruta_municipios`, rutaMunicipio);
    return response.data;
  } catch (error) {
    console.error('Error al crear relación ruta-municipio:', error);
    const errorMessage = error.response?.data?.message || 
                       'Error al crear la relación. Verifique los datos.';
    throw new Error(errorMessage);
  }
};

/**
 * Actualiza una relación ruta-municipio existente
 * @function updateRutaMunicipio
 * @memberof rutaMunicipioService
 * @param {number} id - ID de la relación a actualizar
 * @param {Object} rutaMunicipio - Nuevos datos de la relación
 * @param {number} [rutaMunicipio.ruta_id] - Nuevo ID de ruta (opcional)
 * @param {number} [rutaMunicipio.municipio_id] - Nuevo ID de municipio (opcional)
 * @param {number} [rutaMunicipio.orden] - Nuevo orden (opcional)
 * @param {boolean} [rutaMunicipio.es_origen] - Nuevo estado de origen (opcional)
 * @param {boolean} [rutaMunicipio.es_destino] - Nuevo estado de destino (opcional)
 * @returns {Promise<Object>} Relación actualizada
 * @throws {Error} Cuando la relación no existe o hay conflictos
 */
export const updateRutaMunicipio = async (id, rutaMunicipio) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/ruta_municipios/${id}`, rutaMunicipio);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar relación ruta-municipio ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al actualizar la relación';
    
    if (status === 404) message = 'La relación no existe';
    if (status === 409) message = 'Conflicto con los datos proporcionados';
    
    throw new Error(message);
  }
};

/**
 * Elimina una relación ruta-municipio
 * @function deleteRutaMunicipio
 * @memberof rutaMunicipioService
 * @param {number} id - ID de la relación a eliminar
 * @returns {Promise<Object>} Confirmación de eliminación
 * @throws {Error} Cuando la relación no existe o no se puede eliminar
 * @example
 * // Ejemplo de eliminación con manejo de errores
 * deleteRutaMunicipio(5)
 *   .then(() => console.log('Relación eliminada'))
 *   .catch(error => console.error('Error:', error.message));
 */
export const deleteRutaMunicipio = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/ruta_municipios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar relación ruta-municipio ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al eliminar la relación';
    
    if (status === 404) message = 'La relación no existe';
    if (status === 403) message = 'No se puede eliminar una relación en uso';
    
    throw new Error(message);
  }
};