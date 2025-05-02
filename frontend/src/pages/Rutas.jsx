import React, { useEffect, useState } from 'react';
import { getRutas } from '../services/rutasService';
import { getViajesPorRuta } from '../services/viajesService';
import RutasSegmented from '../components/RutaSegmented';
import FabRutas from '../components/FabRutas';

function Rutas() {
  const [rutas, setRutas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [viajesPorRuta, setViajesPorRuta] = useState({});

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
        setMensaje('Error al cargar rutas.');
      }
    };
    fetchData();
  }, []);

  const handleVerBuses = async (rutaId) => {
    if (!viajesPorRuta[rutaId]) {
      const data = await getViajesPorRuta(rutaId);
      setViajesPorRuta((prev) => ({ ...prev, [rutaId]: data }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Rutas Disponibles</h2>

      {mensaje && <p className="text-center text-red-500">{mensaje}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {rutas.map((ruta) => (
          <RutasSegmented
            key={ruta.id}
            ruta={ruta}
            viajes={viajesPorRuta[ruta.id]}
            onVerBuses={handleVerBuses}
          />
        ))}
      </div>

      <FabRutas icon="map" label="Ver Mapa General" onClick={() => alert('Ir a mapa general')} />
    </div>
  );
}

export default Rutas;
