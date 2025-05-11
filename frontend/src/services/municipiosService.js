import axios from 'axios';

// URL base de la API para el servicio de municipios
const API_BASE_URL = 'http://localhost:4004/api';

/**
 * Servicio para manejar operaciones CRUD de municipios
 * @namespace municipiosService
 */

/**
 * Obtiene todos los municipios registrados
 * @function getMunicipios
 * @memberof municipiosService
 * @returns {Promise<Array<{
 *   id: number,
 *   nombre: string,
 *   departamento: string,
 *   codigo_postal?: string
 * }>>} Lista de municipios con sus datos básicos
 * @throws {Error} Cuando falla la petición al servidor
 * @example
 * try {
 *   const municipios = await getMunicipios();
 *   console.log(municipios);
 * } catch (error) {
 *   console.error('Error:', error.message);
 * }
 */
export const getMunicipios = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/municipios`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    throw new Error('No se pudieron cargar los municipios. Intente nuevamente más tarde.');
  }
};

/**
 * Crea un nuevo registro de municipio
 * @function createMunicipio
 * @memberof municipiosService
 * @param {Object} municipio - Datos del municipio a crear
 * @param {string} municipio.nombre - Nombre del municipio (requerido)
 * @param {string} municipio.departamento - Departamento al que pertenece (requerido)
 * @param {string} [municipio.codigo_postal] - Código postal opcional
 * @returns {Promise<Object>} Municipio creado con ID asignado
 * @throws {Error} Cuando los datos son inválidos o hay error de conexión
 */
export const createMunicipio = async (municipio) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/municipios`, municipio);
    return response.data;
  } catch (error) {
    console.error('Error al crear municipio:', error);
    const message = error.response?.data?.message || 'Error al registrar el municipio. Verifique los datos.';
    throw new Error(message);
  }
};

/**
 * Actualiza los datos de un municipio existente
 * @function updateMunicipio
 * @memberof municipiosService
 * @param {number} id - ID del municipio a actualizar
 * @param {Object} municipio - Nuevos datos del municipio
 * @param {string} [municipio.nombre] - Nuevo nombre (opcional)
 * @param {string} [municipio.departamento] - Nuevo departamento (opcional)
 * @param {string} [municipio.codigo_postal] - Nuevo código postal (opcional)
 * @returns {Promise<Object>} Municipio actualizado
 * @throws {Error} Cuando el municipio no existe o hay error de validación
 */
export const updateMunicipio = async (id, municipio) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/municipios/${id}`, municipio);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar municipio ID ${id}:`, error);
    const message = error.response?.status === 404 
      ? 'El municipio no existe'
      : 'Error al actualizar el municipio';
    throw new Error(message);
  }
};

/**
 * Elimina un municipio del sistema
 * @function deleteMunicipio
 * @memberof municipiosService
 * @param {number} id - ID del municipio a eliminar
 * @returns {Promise<Object>} Objeto con confirmación de eliminación
 * @throws {Error} Cuando el municipio no existe o no se puede eliminar
 * @example
 * // Ejemplo de uso
 * deleteMunicipio(5)
 *   .then(() => console.log('Municipio eliminado'))
 *   .catch(error => console.error(error.message));
 */
export const deleteMunicipio = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/municipios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar municipio ID ${id}:`, error);
    const status = error.response?.status;
    const message = status === 404 
      ? 'El municipio no existe' 
      : status === 409
      ? 'No se puede eliminar el municipio porque tiene registros asociados'
      : 'Error al eliminar el municipio';
    throw new Error(message);
  }
};