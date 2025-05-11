import React, { useEffect, useState } from 'react';
import { getRutas } from '../services/rutasService';
import { getViajesPorRuta } from '../services/viajesService';
import RutasSegmented from '../components/RutaSegmented';
import FabRutas from '../components/FabRutas';

/**
 * Componente Rutas - Muestra las rutas disponibles y sus viajes asociados
 * 
 * Características:
 * - Obtiene y muestra todas las rutas disponibles
 * - Permite ver los viajes para cada ruta
 * - Incluye un botón flotante para ver el mapa general
 * - Diseño responsive con grid layout
 */
function Rutas() {
  // Estados del componente
  const [rutas, setRutas] = useState([]); // Almacena las rutas disponibles
  const [mensaje, setMensaje] = useState(''); // Para mensajes de estado/error
  const [viajesPorRuta, setViajesPorRuta] = useState({}); // Almacena los viajes por ruta

  /**
   * Efecto para cargar las rutas al montar el componente
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRutas();
        if (data.length > 0) {
          setRutas(data);
        } else {
          setMensaje('No hay rutas registradas.');
        }
      } catch (error) {
        console.error('Error al obtener rutas:', error);
        setMensaje('Error al cargar las rutas. Intente nuevamente.');
      }
    };
    fetchData();
  }, []);

  /**
   * Maneja la obtención de viajes para una ruta específica
   * @param {number} rutaId - ID de la ruta seleccionada
   */
  const handleVerBuses = async (rutaId) => {
    if (!viajesPorRuta[rutaId]) {
      try {
        const data = await getViajesPorRuta(rutaId);
        setViajesPorRuta((prev) => ({ ...prev, [rutaId]: data }));
      } catch (error) {
        console.error(`Error al obtener viajes para ruta ${rutaId}:`, error);
        setMensaje('Error al cargar los viajes para esta ruta.');
      }
    }
  };

  return (
    <div className="p-6">
      {/* Título principal */}
      <h2 className="text-2xl font-bold mb-6 text-center">Rutas Disponibles</h2>

      {/* Mensaje de estado o error */}
      {mensaje && (
        <p className="text-center text-red-500 mb-4">
          {mensaje}
        </p>
      )}

      {/* Grid de rutas */}
      <div className="grid md:grid-cols-2 gap-6">
        {rutas.map((ruta) => (
          <RutasSegmented
            key={ruta.id}
            ruta={ruta}
            viajes={viajesPorRuta[ruta.id]}
            onVerBuses={() => handleVerBuses(ruta.id)}
          />
        ))}
      </div>

      {/* Botón flotante para mapa general */}
      <FabRutas 
        icon="map" 
        label="Ver Mapa General" 
        onClick={() => navigate('/mapa-general')} 
      />
    </div>
  );
}

export default Rutas;