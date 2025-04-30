import React, { useEffect, useState } from 'react';
import { getEmpresas, getRutasPorEmpresa } from '../services/rutasService'; // Importamos el servicio

function Buses() {
  const [buses, setBuses] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [mensaje, setMensaje] = useState('');

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
              <li key={ruta.id}>
                {ruta.origen} → {ruta.destino}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Buses;