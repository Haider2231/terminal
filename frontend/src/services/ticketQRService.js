import QRCode from 'qrcode';
import { createTicket } from './tiquetesService'; // ✅ Este es el archivo real

// canvasElementId: id del canvas donde se pintará el QR
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
