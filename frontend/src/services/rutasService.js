import axios from 'axios';

// URL base de la API para los servicios de rutas y empresas
const API_BASE_URL = 'http://localhost:4004/api';

/**
 * Servicio para la gestión de rutas de transporte
 * @namespace rutasService
 */

/**
 * Obtiene todas las rutas registradas
 * @function getRutas
 * @memberof rutasService
 * @returns {Promise<Array<{
 *   id: number,
 *   origen: string,
 *   destino: string,
 *   distancia: number,
 *   duracion_estimada: number,
 *   empresa_id: number,
 *   tarifa_base: number,
 *   activa: boolean,
 *   creado_en: string,
 *   actualizado_en: string
 * }>>} Lista de rutas con sus detalles
 * @throws {Error} Cuando falla la conexión con el servidor
 */
export const getRutas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rutas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener rutas:', error);
    throw new Error('No se pudieron cargar las rutas. Intente nuevamente más tarde.');
  }
};

/**
 * Crea una nueva ruta de transporte
 * @function createRuta
 * @memberof rutasService
 * @param {Object} ruta - Datos de la ruta a crear
 * @param {string} ruta.origen - Ciudad/ubicación de origen (requerido)
 * @param {string} ruta.destino - Ciudad/ubicación de destino (requerido)
 * @param {number} ruta.distancia - Distancia en kilómetros (requerido)
 * @param {number} ruta.duracion_estimada - Duración en minutos (requerido)
 * @param {number} ruta.empresa_id - ID de la empresa operadora (requerido)
 * @param {number} [ruta.tarifa_base] - Tarifa base (opcional)
 * @param {boolean} [ruta.activa=true] - Estado activo/inactivo (default: true)
 * @returns {Promise<Object>} Ruta creada con ID asignado
 * @throws {Error} Cuando faltan datos requeridos o hay conflictos
 */
export const createRuta = async (ruta) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rutas`, ruta);
    return response.data;
  } catch (error) {
    console.error('Error al crear ruta:', error);
    const errorMessage = error.response?.data?.message || 
                       'Error al crear la ruta. Verifique los datos.';
    throw new Error(errorMessage);
  }
};

/**
 * Actualiza los datos de una ruta existente
 * @function updateRuta
 * @memberof rutasService
 * @param {number} id - ID de la ruta a actualizar
 * @param {Object} ruta - Nuevos datos de la ruta
 * @param {string} [ruta.origen] - Nuevo origen (opcional)
 * @param {string} [ruta.destino] - Nuevo destino (opcional)
 * @param {number} [ruta.distancia] - Nueva distancia (opcional)
 * @param {number} [ruta.duracion_estimada] - Nueva duración (opcional)
 * @param {number} [ruta.empresa_id] - Nueva empresa (opcional)
 * @param {number} [ruta.tarifa_base] - Nueva tarifa (opcional)
 * @param {boolean} [ruta.activa] - Nuevo estado (opcional)
 * @returns {Promise<Object>} Ruta actualizada
 * @throws {Error} Cuando la ruta no existe o hay conflictos
 */
export const updateRuta = async (id, ruta) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/rutas/${id}`, ruta);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar ruta ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al actualizar la ruta';
    
    if (status === 404) message = 'La ruta no existe';
    if (status === 409) message = 'Conflicto con los datos proporcionados';
    
    throw new Error(message);
  }
};

/**
 * Elimina una ruta del sistema
 * @function deleteRuta
 * @memberof rutasService
 * @param {number} id - ID de la ruta a eliminar
 * @returns {Promise<Object>} Confirmación de eliminación
 * @throws {Error} Cuando la ruta no existe o tiene viajes asociados
 */
export const deleteRuta = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/rutas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar ruta ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al eliminar la ruta';
    
    if (status === 404) message = 'La ruta no existe';
    if (status === 403) message = 'No se puede eliminar una ruta con viajes programados';
    
    throw new Error(message);
  }
};

/**
 * Obtiene las rutas de una empresa específica
 * @function getRutasPorEmpresa
 * @memberof rutasService
 * @param {number} empresaId - ID de la empresa
 * @returns {Promise<Array<Object>>} Lista de rutas de la empresa
 * @throws {Error} Cuando la empresa no existe o hay error de conexión
 */
export const getRutasPorEmpresa = async (empresaId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rutas/empresa/${empresaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener rutas para empresa ID ${empresaId}:`, error);
    const message = error.response?.status === 404 
      ? 'La empresa no existe' 
      : 'Error al obtener las rutas de la empresa';
    throw new Error(message);
  }
};

/**
 * Servicio para la gestión de empresas de transporte
 * @namespace empresasService
 */

/**
 * Obtiene todas las empresas registradas
 * @function getEmpresas
 * @memberof empresasService
 * @returns {Promise<Array<{
 *   id: number,
 *   nombre: string,
 *   nit: string,
 *   direccion: string,
 *   telefono: string,
 *   email: string,
 *   activa: boolean,
 *   creado_en: string,
 *   actualizado_en: string
 * }>>} Lista de empresas con sus detalles
 * @throws {Error} Cuando falla la conexión con el servidor
 */
export const getEmpresas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empresas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    throw new Error('No se pudieron cargar las empresas. Intente nuevamente.');
  }
};

/**
 * Crea una nueva empresa de transporte
 * @function createEmpresa
 * @memberof empresasService
 * @param {Object} empresa - Datos de la empresa a crear
 * @param {string} empresa.nombre - Nombre de la empresa (requerido)
 * @param {string} empresa.nit - NIT/RUC (requerido)
 * @param {string} [empresa.direccion] - Dirección (opcional)
 * @param {string} [empresa.telefono] - Teléfono (opcional)
 * @param {string} [empresa.email] - Email (opcional)
 * @param {boolean} [empresa.activa=true] - Estado activo/inactivo (default: true)
 * @returns {Promise<Object>} Empresa creada con ID asignado
 * @throws {Error} Cuando faltan datos requeridos o hay conflictos
 */
export const createEmpresa = async (empresa) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/empresas`, empresa);
    return response.data;
  } catch (error) {
    console.error('Error al crear empresa:', error);
    const errorMessage = error.response?.data?.message || 
                       'Error al registrar la empresa. Verifique los datos.';
    throw new Error(errorMessage);
  }
};

/**
 * Actualiza los datos de una empresa existente
 * @function updateEmpresa
 * @memberof empresasService
 * @param {number} id - ID de la empresa a actualizar
 * @param {Object} empresa - Nuevos datos de la empresa
 * @param {string} [empresa.nombre] - Nuevo nombre (opcional)
 * @param {string} [empresa.nit] - Nuevo NIT (opcional)
 * @param {string} [empresa.direccion] - Nueva dirección (opcional)
 * @param {string} [empresa.telefono] - Nuevo teléfono (opcional)
 * @param {string} [empresa.email] - Nuevo email (opcional)
 * @param {boolean} [empresa.activa] - Nuevo estado (opcional)
 * @returns {Promise<Object>} Empresa actualizada
 * @throws {Error} Cuando la empresa no existe o hay conflictos
 */
export const updateEmpresa = async (id, empresa) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/empresas/${id}`, empresa);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar empresa ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al actualizar la empresa';
    
    if (status === 404) message = 'La empresa no existe';
    if (status === 409) message = 'Conflicto con los datos proporcionados';
    
    throw new Error(message);
  }
};

/**
 * Elimina una empresa del sistema
 * @function deleteEmpresa
 * @memberof empresasService
 * @param {number} id - ID de la empresa a eliminar
 * @returns {Promise<Object>} Confirmación de eliminación
 * @throws {Error} Cuando la empresa no existe o tiene rutas asociadas
 */
export const deleteEmpresa = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/empresas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar empresa ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al eliminar la empresa';
    
    if (status === 404) message = 'La empresa no existe';
    if (status === 403) message = 'No se puede eliminar una empresa con rutas registradas';
    
    throw new Error(message);
  }
};