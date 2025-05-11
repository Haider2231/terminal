import axios from 'axios';

// URL base de la API para el servicio de tickets
const API_BASE_URL = 'http://localhost:4004/api';

/**
 * Servicio para la gestión de tickets de transporte
 * @namespace ticketsService
 */

/**
 * Obtiene todos los tickets registrados en el sistema
 * @function getTickets
 * @memberof ticketsService
 * @returns {Promise<Array<{
 *   id: number,
 *   viaje_id: number,
 *   usuario_id: number,
 *   asiento: string,
 *   fecha_compra: string,
 *   estado: string,
 *   precio: number,
 *   codigo_qr?: string
 * }>>} Lista de tickets con sus detalles
 * @throws {Error} Cuando falla la conexión con el servidor
 * @example
 * try {
 *   const tickets = await getTickets();
 *   console.log('Tickets obtenidos:', tickets);
 * } catch (error) {
 *   console.error('Error:', error.message);
 * }
 */
export const getTickets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tickets`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener tickets:', error);
    throw new Error('No se pudieron cargar los tickets. Intente nuevamente más tarde.');
  }
};

/**
 * Crea un nuevo ticket de transporte
 * @function createTicket
 * @memberof ticketsService
 * @param {Object} ticket - Datos del ticket a crear
 * @param {number} ticket.viaje_id - ID del viaje asociado (requerido)
 * @param {number} ticket.usuario_id - ID del usuario comprador (requerido)
 * @param {string} ticket.asiento - Número/identificador del asiento (requerido)
 * @param {number} [ticket.precio] - Precio del ticket (opcional)
 * @returns {Promise<Object>} Ticket creado con ID asignado y datos completos
 * @throws {Error} Cuando faltan datos requeridos o hay conflictos
 * @example
 * // Ejemplo de uso
 * createTicket({
 *   viaje_id: 123,
 *   usuario_id: 456,
 *   asiento: 'A12',
 *   precio: 25000
 * })
 * .then(ticket => console.log('Ticket creado:', ticket))
 * .catch(error => console.error('Error:', error.message));
 */
export const createTicket = async (ticket) => {
  try {
    console.log('Datos enviados al servidor:', ticket);
    const response = await axios.post(`${API_BASE_URL}/tickets`, ticket);
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el ticket:', error);
    const errorMessage = error.response?.data?.message || 
                       'Error al crear el ticket. Verifique los datos e intente nuevamente.';
    throw new Error(errorMessage);
  }
};

/**
 * Actualiza los datos de un ticket existente
 * @function updateTicket
 * @memberof ticketsService
 * @param {number} id - ID del ticket a actualizar
 * @param {Object} ticket - Nuevos datos del ticket
 * @param {number} [ticket.viaje_id] - Nuevo ID de viaje (opcional)
 * @param {string} [ticket.asiento] - Nuevo asiento (opcional)
 * @param {string} [ticket.estado] - Nuevo estado (opcional)
 * @returns {Promise<Object>} Ticket actualizado
 * @throws {Error} Cuando el ticket no existe o hay conflictos
 */
export const updateTicket = async (id, ticket) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tickets/${id}`, ticket);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar ticket ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al actualizar el ticket';
    
    if (status === 404) message = 'El ticket no existe';
    if (status === 409) message = 'Conflicto con los datos proporcionados';
    
    throw new Error(message);
  }
};

/**
 * Elimina un ticket del sistema
 * @function deleteTicket
 * @memberof ticketsService
 * @param {number} id - ID del ticket a eliminar
 * @returns {Promise<Object>} Confirmación de eliminación
 * @throws {Error} Cuando el ticket no existe o no se puede eliminar
 */
export const deleteTicket = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tickets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar ticket ID ${id}:`, error);
    const status = error.response?.status;
    let message = 'Error al eliminar el ticket';
    
    if (status === 404) message = 'El ticket no existe';
    if (status === 403) message = 'No se puede eliminar un ticket ya utilizado';
    
    throw new Error(message);
  }
};