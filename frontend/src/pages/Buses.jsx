import React, { useEffect, useState } from 'react';
import { getEmpresas, getRutasPorEmpresa } from '../services/rutasService';
import { getBusesPorRuta } from '../services/busesService';

function Buses() {
  const [empresas, setEmpresas] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [buses, setBuses] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const data = await getEmpresas();
        if (data.length > 0) {
          setEmpresas(data);
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

  const handleEmpresaClick = async (empresa) => {
    setSelectedEmpresa(empresa);
    setRutas([]);
    setBuses([]);
    setMensaje('');

    try {
      const data = await getRutasPorEmpresa(empresa.id);
      if (data.length > 0) {
        setRutas(data);
      } else {
        setMensaje('No hay rutas registradas para esta empresa.');
      }
    } catch (error) {
      setMensaje('Hubo un error al cargar las rutas.');
    }
  };

  const handleVerBuses = async (rutaId) => {
    setBuses([]);
    setMensaje('');

    try {
      const data = await getBusesPorRuta(rutaId);
      if (data.length > 0) {
        setBuses(data);
      } else {
        setMensaje('No hay buses disponibles para esta ruta.');
      }
    } catch (error) {
      setMensaje('Hubo un error al cargar los buses.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Empresas</h2>

      {mensaje && <p className="text-red-500">{mensaje}</p>}

      <div className="radio-inputs">
        {empresas.map((empresa) => (
          <label key={empresa.id} className="radio-tile">
            <input
              type="radio"
              name="empresa"
              className="radio-input"
              onChange={() => handleEmpresaClick(empresa)}
            />
            <span className="radio-label">{empresa.nombre}</span>
          </label>
        ))}
      </div>

      {selectedEmpresa && rutas.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Rutas de {selectedEmpresa.nombre}</h3>
          <ul className="mt-2 list-disc list-inside">
            {rutas.map((ruta) => (
              <li key={ruta.id} className="flex justify-between items-center space-x-4">
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

      {buses.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Buses Disponibles</h3>
          <ul className="mt-2 list-disc list-inside">
            {buses.map((bus) => (
              <li key={bus.id}>
                <strong>Bus:</strong> {bus.numero_bus}, <strong>Conductor:</strong> {bus.conductor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Buses;
