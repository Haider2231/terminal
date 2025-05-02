import React, { useState } from 'react';
import QRCode from 'qrcode';
import { createTicket } from '../services/tiquetesService';

const ComprarTicket = () => {
  const [formData, setFormData] = useState({
    usuario_id: '',
    viaje_id: '',
    asiento: ''
  });
  const [qrUrl, setQrUrl] = useState('');
  const [ticketCreado, setTicketCreado] = useState(null);
  const [error, setError] = useState(null); // Para manejar errores si los hay

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTicket({
        usuario_id: parseInt(formData.usuario_id),
        viaje_id: parseInt(formData.viaje_id),
        asiento: formData.asiento
      });

      // Muestra los datos recibidos en la consola
      console.log('Datos del ticket creado:', response);

      // Establecer los datos en el estado para mostrarlos en la interfaz
      setTicketCreado(response);

      const qrData = JSON.stringify(response);
      const qr = await QRCode.toDataURL(qrData);
      setQrUrl(qr);

    } catch (error) {
      setError('Error al crear el ticket. Verifica los datos.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Comprar Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="usuario_id"
          placeholder="ID del usuario"
          value={formData.usuario_id}
          onChange={handleChange}
          required
        /><br />
        <input
          type="number"
          name="viaje_id"
          placeholder="ID del viaje"
          value={formData.viaje_id}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="asiento"
          placeholder="Asiento (ej: A3)"
          value={formData.asiento}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Comprar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {ticketCreado && (
  <div style={{
    marginTop: '30px',
    border: '1px solid #ccc',
    padding: '20px',
    width: 'fit-content',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px'
  }}>
    <h3>🎫 Ticket de Viaje</h3>
    <p><strong>Nombre:</strong> {ticketCreado.nombre}</p>
    <p><strong>Origen:</strong> {ticketCreado.origen}</p>
    <p><strong>Destino:</strong> {ticketCreado.destino}</p>
    <p><strong>Asiento:</strong> {ticketCreado.asiento}</p>
    <p><strong>Fecha de compra:</strong> {new Date(ticketCreado.fecha).toLocaleString()}</p>
    <p><strong>Precio:</strong> ${ticketCreado.precio}</p>

    {qrUrl && (
      <div style={{ marginTop: '10px' }}>
        <img src={qrUrl} alt="QR del ticket" />
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default ComprarTicket;
