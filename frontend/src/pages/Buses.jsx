import React, { useEffect, useState } from 'react';
import { getEmpresas, getRutasPorEmpresa } from '../services/rutasService';
import { getViajesPorRuta } from '../services/viajesService';

/**
 * Componente Buses que muestra:
 * - Listado de empresas de transporte
 * - Rutas disponibles por empresa
 * - Viajes programados por ruta
 */
function Buses() {
  // Estados del componente
  const [buses, setBuses] = useState([]); // Lista de empresas de buses
  const [rutas, setRutas] = useState([]); // Rutas de la empresa seleccionada
  const [selectedBus, setSelectedBus] = useState(null); // Empresa seleccionada
  const [mensaje, setMensaje] = useState(''); // Mensajes de estado/error
  const [viajes, setViajes] = useState([]); // Viajes de la ruta seleccionada

  // Cargar empresas al montar el componente
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const data = await getEmpresas();
        if (data.length > 0) {
          setBuses(data);
          setMensaje('');
        } else {
          setMensaje('No hay empresas registradas.');
        }
      } catch (error) {
        console.error('Error fetching empresas:', error);
        setMensaje('Hubo un error al cargar las empresas.');
      }
    };

    fetchEmpresas();
  }, []);

  /**
   * Maneja la selección de una empresa
   * @param {Object} bus - Empresa seleccionada
   */
  const handleBusClick = async (bus) => {
    setSelectedBus(bus);
    setRutas([]);
    setViajes([]);
    setMensaje('');

    try {
      const data = await getRutasPorEmpresa(bus.id);
      if (data.length > 0) {
        setRutas(data);
      } else {
        setMensaje('No hay rutas registradas para esta empresa.');
      }
    } catch (error) {
      console.error('Error fetching rutas:', error);
      setMensaje('Hubo un error al cargar las rutas.');
    }
  };

  /**
   * Obtiene los viajes disponibles para una ruta específica
   * @param {number} rutaId - ID de la ruta seleccionada
   */
  const handleVerBuses = async (rutaId) => {
    try {
      const data = await getViajesPorRuta(rutaId);
      setViajes(data);
    } catch (error) {
      console.error('Error al obtener los viajes:', error);
      setMensaje('Error al cargar los viajes');
    }
  };

  return (
    <div className="p-4">
      {/* Encabezado y lista de empresas */}
      <h2 className="text-xl font-bold mb-4">Lista de Empresas</h2>
      {mensaje && <p className="text-red-500">{mensaje}</p>}

      {/* Selector de empresas */}
      <div className="radio-inputs">
        {buses.map((bus) => (
          <label key={bus.id} className="radio-tile">
            <input
              type="radio"
              name="bus"
              className="radio-input"
              onChange={() => handleBusClick(bus)}
            />
            <span className="radio-label">{bus.nombre}</span>
          </label>
        ))}
      </div>

      {/* Listado de rutas para la empresa seleccionada */}
      {selectedBus && rutas.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Rutas de {selectedBus.nombre}</h3>
          <ul className="mt-2 list-disc list-inside">
            {rutas.map((ruta) => (
              <li key={ruta.id} className="flex justify-between items-center space-x-4">
                <span>{ruta.origen} → {ruta.destino}</span>
                <button 
                  onClick={() => handleVerBuses(ruta.id)} 
                  className="header-button"
                  aria-label={`Ver buses para ruta ${ruta.origen}-${ruta.destino}`}
                >
                  Ver Buses
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Listado de viajes disponibles */}
      {viajes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Buses Disponibles</h3>
          <ul className="mt-2 list-disc list-inside">
            {viajes.map((viaje) => (
              <li key={viaje.id}>
                Bus: {viaje.numero_bus}, 
                Salida: {new Date(viaje.salida).toLocaleString()}, 
                Llegada: {new Date(viaje.llegada).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Buses;