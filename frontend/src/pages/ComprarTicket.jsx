import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { createTicket } from '../services/tiquetesService';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

/**
 * Componente para comprar tickets de viaje
 * - Permite seleccionar viaje y asiento
 * - Genera un ticket con QR
 * - Muestra la ubicación del comprador en mapa
 */
const ComprarTicket = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Estados del componente
  const [formData, setFormData] = useState({
    viaje_id: '',
    asiento: ''
  });
  const [qrUrl, setQrUrl] = useState('');
  const [ticketCreado, setTicketCreado] = useState(null);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);

  /**
   * Maneja cambios en los campos del formulario
   * @param {Object} e - Evento del input
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Procesa el envío del formulario
   * @param {Object} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert('Debes iniciar sesión para comprar un ticket.');
      navigate('/login');
      return;
    }

    if (!formData.viaje_id || !formData.asiento) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const ticketData = {
        usuario_id: user.id,
        viaje_id: parseInt(formData.viaje_id),
        asiento: formData.asiento
      };

      const response = await createTicket(ticketData);
      setTicketCreado(response);

      // Generar QR con los datos del ticket
      const qr = await QRCode.toDataURL(JSON.stringify(response));
      setQrUrl(qr);

      showBuyerLocation();
    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear el ticket');
      console.error('Error:', error);
    }
  };

  /**
   * Muestra la ubicación del comprador en el mapa
   */
  const showBuyerLocation = () => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const mapOptions = {
      zoom: 14,
      center: { lat: 0, lng: 0 },
      mapTypeControl: false,
      streetViewControl: false
    };

    const mapInstance = new window.google.maps.Map(mapContainer, mapOptions);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const buyerLocation = { lat: latitude, lng: longitude };

          mapInstance.setCenter(buyerLocation);
          new window.google.maps.Marker({
            map: mapInstance,
            position: buyerLocation,
            title: 'Tu ubicación',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }
          });

          // Agregar círculo para mostrar precisión
          new window.google.maps.Circle({
            strokeColor: '#4285F4',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#4285F4',
            fillOpacity: 0.35,
            map: mapInstance,
            center: buyerLocation,
            radius: position.coords.accuracy
          });
        },
        (error) => {
          console.error('Error de geolocalización:', error);
          setError('No pudimos obtener tu ubicación para mostrar en el mapa');
        }
      );
    } else {
      setError('Tu navegador no soporta geolocalización');
    }

    setMap(mapInstance);
  };

  // Cargar API de Google Maps
  useEffect(() => {
    const scriptId = 'google-maps-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYDCSXtmUI-KR3qJ29oRdemNUpSIb-UDQ&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onerror = () => setError('Error al cargar Google Maps');
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="ticket-container">
      <div className="ticket-form">
        <h2>Comprar Ticket</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="viaje_id">ID del Viaje</label>
            <input
              type="number"
              id="viaje_id"
              name="viaje_id"
              value={formData.viaje_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="asiento">Número de Asiento</label>
            <input
              type="text"
              id="asiento"
              name="asiento"
              placeholder="Ej: A3"
              value={formData.asiento}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Comprar Ticket
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {ticketCreado && (
          <div className="ticket-details">
            <h3>🎫 Ticket de Viaje</h3>
            
            <div className="ticket-info">
              <p><strong>Nombre:</strong> {ticketCreado.nombre}</p>
              <p><strong>Ruta:</strong> {ticketCreado.origen} → {ticketCreado.destino}</p>
              <p><strong>Asiento:</strong> {ticketCreado.asiento}</p>
              <p><strong>Bus:</strong> {ticketCreado.numero_bus}</p>
              <p><strong>Empresa:</strong> {ticketCreado.empresa}</p>
              <p><strong>Salida:</strong> {new Date(ticketCreado.salida).toLocaleString()}</p>
              <p><strong>Llegada:</strong> {new Date(ticketCreado.llegada).toLocaleString()}</p>
              <p><strong>Precio:</strong> ${ticketCreado.precio.toFixed(2)}</p>
            </div>

            {qrUrl && (
              <div className="qr-code">
                <img src={qrUrl} alt="Código QR del ticket" />
                <p>Escanear para validar ticket</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div id="map" className="map-container"></div>
    </div>
  );
};

export default ComprarTicket;

