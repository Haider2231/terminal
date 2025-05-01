import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRutas } from '../services/rutasService'; // Importamos el servicio
import { getViajesPorRuta } from '../services/viajesService'; // Nuevo servicio para obtener viajes

function Rutas() {
  const [rutas, setRutas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [viajes, setViajes] = useState([]); // Estado para almacenar los viajes
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const data = await getRutas();
        if (data.length > 0) {
          setRutas(data);
          setMensaje('');
        } else {
          setMensaje('No hay rutas registradas.');
        }
      } catch (error) {
        setMensaje('Hubo un error al cargar las rutas.');
      }
    };

    fetchRutas();
  }, []);

  const handleVerMapa = (ruta) => {
    navigate('/mapa', { state: { ruta } });
  };

  const handleVerBuses = async (rutaId) => {
    try {
      const data = await getViajesPorRuta(rutaId);
      setViajes(data);
    } catch (error) {
      console.error('Error al obtener los viajes:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Listado de Rutas</h2>

      {mensaje && <p className="text-red-500">{mensaje}</p>}

      <ul>
        {rutas.map((ruta) => (
          <li 
            key={ruta.id} 
            className="mb-2 p-4 bg-gradient-to-r from-[var(--color-300)] to-[var(--color-400)] text-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg flex justify-between items-center"
          >
            <div>
              <span className="font-semibold">{ruta.origen} → {ruta.destino}</span>
              <span className="ml-2 text-gray-200">({ruta.empresa})</span>
            </div>
            <div>
              <button 
                onClick={() => handleVerMapa(ruta)} 
                className="header-button mr-2"
              >
                Ver Mapa
              </button>
              <button 
                onClick={() => handleVerBuses(ruta.id)} 
                className="header-button"
              >
                Ver Buses
              </button>
            </div>
          </li>
        ))}
      </ul>

      {viajes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Buses Disponibles</h3>
          <ul className="mt-2 list-disc list-inside">
            {viajes.map((viaje) => (
              <li key={viaje.id}>
                Bus: {viaje.numero_bus}, Salida: {viaje.salida}, Llegada: {viaje.llegada}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Rutas;