import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { createTicket } from '../services/tiquetesService';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ComprarTicket = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    viaje_id: '',
    asiento: ''
  });
  const [qrUrl, setQrUrl] = useState('');
  const [ticketCreado, setTicketCreado] = useState(null);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si el usuario está autenticado
    if (!user || !user.id) {
      alert('Debes iniciar sesión para comprar un ticket.');
      navigate('/login'); // Redirigir al login si no está autenticado
      return;
    }

    // Validar datos antes de enviarlos
    if (!formData.viaje_id || !formData.asiento) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const ticketData = {
        usuario_id: user.id, // Usar el ID del usuario autenticado
        viaje_id: parseInt(formData.viaje_id),
        asiento: formData.asiento
      };

      console.log('Datos enviados:', ticketData); // Verificar datos antes de enviarlos
      const response = await createTicket(ticketData);

      setTicketCreado(response);

      const qrData = JSON.stringify(response);
      const qr = await QRCode.toDataURL(qrData);
      setQrUrl(qr);

      // Mostrar ubicación del comprador en el mapa
      showBuyerLocation();
    } catch (error) {
      setError('Error al crear el ticket. Verifica los datos.');
      console.error(error);
    }
  };

  const showBuyerLocation = () => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const mapInstance = new window.google.maps.Map(mapContainer, {
      zoom: 14,
      center: { lat: 0, lng: 0 }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const buyerLocation = { lat: latitude, lng: longitude };

          mapInstance.setCenter(buyerLocation);
          new window.google.maps.Marker({
            map: mapInstance,
            position: buyerLocation,
            title: 'Tu ubicación'
          });
        },
        (error) => {
          console.error('Error al obtener la ubicación del comprador:', error);
        }
      );
    } else {
      console.error('Geolocalización no soportada por el navegador.');
    }

    setMap(mapInstance);
  };

  useEffect(() => {
    const scriptId = 'google-maps-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYDCSXtmUI-KR3qJ29oRdemNUpSIb-UDQ&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 1 }}>
        <h2>Comprar Ticket</h2>
        <form onSubmit={handleSubmit}>
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
            <p><strong>Bus:</strong> {ticketCreado.numero_bus}</p>
            <p><strong>Empresa:</strong> {ticketCreado.empresa}</p>
            <p><strong>Salida:</strong> {new Date(ticketCreado.salida).toLocaleString()}</p>
            <p><strong>Llegada:</strong> {new Date(ticketCreado.llegada).toLocaleString()}</p>
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

      <div id="map" style={{ flex: 1, height: '500px', marginLeft: '20px', border: '1px solid #ccc' }}></div>
    </div>
  );
};

export default ComprarTicket;
