import React, { useEffect, useState } from 'react';
import { getEmpresas, getRutasPorEmpresa } from '../services/rutasService'; // Importamos el servicio
import { getViajesPorRuta } from '../services/viajesService'; // Importamos el servicio para obtener viajes

function Buses() {
  const [buses, setBuses] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [viajes, setViajes] = useState([]); // Estado para almacenar los viajes

  // Al montar el componente, cargar las empresas automáticamente
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
        setMensaje('Hubo un error al cargar las empresas.');
      }
    };

    fetchEmpresas();
  }, []);

  const handleBusClick = async (bus) => {
    setSelectedBus(bus);
    try {
      const data = await getRutasPorEmpresa(bus.id);
      if (data.length > 0) {
        setRutas(data);
        setMensaje('');
      } else {
        setMensaje('No hay rutas registradas para esta empresa.');
      }
    } catch (error) {
      setMensaje('Hubo un error al cargar las rutas.');
    }
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
      <h2 className="text-xl font-bold mb-4">Lista de Buses</h2>

      {mensaje && <p className="text-red-500">{mensaje}</p>}

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

      {selectedBus && rutas.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Rutas de {selectedBus.nombre}</h3>
          <ul className="mt-2 list-disc list-inside">
            {rutas.map((ruta) => (
              <li key={ruta.id} className="flex justify-between items-center">
                <span>{ruta.origen} → {ruta.destino}</span>
                <button 
                  onClick={() => handleVerBuses(ruta.id)} 
                  className="header-button"
                >
                  Ver Buses
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

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

export default Buses;