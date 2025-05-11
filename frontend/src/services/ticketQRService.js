import QRCode from 'qrcode';
import { createTicket } from './tiquetesService';

/**
 * Compra un ticket y genera su código QR asociado
 * 
 * @param {Object} ticketData - Datos requeridos para la compra del ticket
 * @param {number} ticketData.viaje_id - ID del viaje a reservar
 * @param {number} ticketData.usuario_id - ID del usuario comprador
 * @param {string} ticketData.asiento - Número/identificador del asiento
 * @param {string} canvasElementId - ID del elemento <canvas> donde se renderizará el QR
 * 
 * @example
 * // Ejemplo de uso básico
 * buyTicketAndShowQRCode(
 *   { viaje_id: 123, usuario_id: 456, asiento: 'A12' },
 *   'miCanvas'
 * );
 * 
 * @throws {Error} - Si falla la creación del ticket o la generación del QR
 */
export const buyTicketAndShowQRCode = async (ticketData, canvasElementId) => {
  try {
    const newTicket = await createTicket(ticketData);

    const qrContent = `Ticket ID: ${newTicket.id}\nNombre: ${newTicket.nombre}\nFecha: ${newTicket.fecha}`;

    await QRCode.toCanvas(document.getElementById(canvasElementId), qrContent);

    alert('¡Ticket comprado y QR generado!');
  } catch (error) {
    console.error('Error al generar el QR:', error);
    alert('No se pudo generar el ticket.');
  }
};