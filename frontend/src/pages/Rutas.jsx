import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRutas } from '../services/rutasService'; // Importamos el servicio

function Rutas() {
  const [rutas, setRutas] = useState([]);
  const [mensaje, setMensaje] = useState('');
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
            <button 
              onClick={() => handleVerMapa(ruta)} 
              className="header-button"
            >
              Ver Mapa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rutas;