// src/components/RutasSegmented.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBusesPorRuta } from '../services/busesService';

/**
 * Componente que muestra una tarjeta de ruta con opciones para ver mapa y buses
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.ruta - Datos de la ruta a mostrar
 * @param {Array} props.viajes - Lista de viajes disponibles (no usado actualmente)
 * @param {Function} props.onVerBuses - Función callback para ver buses (no usado actualmente)
 */
function RutasSegmented({ ruta, viajes, onVerBuses }) {
  const navigate = useNavigate();
  const [mostrarViajes, setMostrarViajes] = useState(false);
  const [buses, setBuses] = useState([]);

  /**
   * Navega a la página del mapa con los datos de la ruta
   */
  const handleMapa = () => {
    navigate('/mapa', { state: { ruta } });
  };

  /**
   * Maneja la visualización de buses disponibles para la ruta
   */
  const handleBuses = async () => {
    try {
      const busesData = await getBusesPorRuta(ruta.id);
      setBuses(busesData);
    } catch (error) {
      console.error('Error al obtener los buses:', error);
    }
    setMostrarViajes(!mostrarViajes);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow"
    >
      {/* Encabezado con información de la ruta */}
      <div className="mb-3">
        <p className="text-lg font-bold text-gray-800">{ruta.origen} → {ruta.destino}</p>
        <p className="text-sm text-gray-500">Empresa: {ruta.empresa}</p>
      </div>

      {/* Botones de acción */}
      <div className="flex rounded-full bg-gray-100 p-1 mb-2">
        <button
          onClick={handleMapa}
          className="flex-1 py-2 rounded-full text-sm font-medium text-indigo-600 hover:bg-indigo-100 transition"
          aria-label="Ver mapa de la ruta"
        >
          <MapPin className="inline mr-1" size={16} />
          Mapa
        </button>
        <button
          onClick={handleBuses}
          className="flex-1 py-2 rounded-full text-sm font-medium text-green-600 hover:bg-green-100 transition"
          aria-label="Ver buses disponibles"
        >
          <Bus className="inline mr-1" size={16} />
          Buses
        </button>
      </div>

      {/* Lista animada de buses */}
      <AnimatePresence>
        {mostrarViajes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-3 rounded-lg text-sm"
          >
            <p className="font-semibold mb-2">🚌 Buses disponibles:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {buses.map((bus) => (
                <li key={bus.id}>
                  <strong>Bus:</strong> {bus.numero_bus}, <strong>Conductor:</strong> {bus.conductor}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RutasSegmented;