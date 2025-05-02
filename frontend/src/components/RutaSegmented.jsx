// src/components/RutasSegmented.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function RutasSegmented({ ruta, viajes, onVerBuses }) {
  const navigate = useNavigate();
  const [mostrarViajes, setMostrarViajes] = useState(false);

  const handleMapa = () => {
    navigate('/mapa', { state: { ruta } });
  };

  const handleBuses = async () => {
    await onVerBuses(ruta.id);
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
      <div className="mb-3">
        <p className="text-lg font-bold text-gray-800">{ruta.origen} → {ruta.destino}</p>
        <p className="text-sm text-gray-500">Empresa: {ruta.empresa}</p>
      </div>

      <div className="flex rounded-full bg-gray-100 p-1 mb-2">
        <button
          onClick={handleMapa}
          className="flex-1 py-2 rounded-full text-sm font-medium text-indigo-600 hover:bg-indigo-100 transition"
        >
          <MapPin className="inline mr-1" size={16} />
          Mapa
        </button>
        <button
          onClick={handleBuses}
          className="flex-1 py-2 rounded-full text-sm font-medium text-green-600 hover:bg-green-100 transition"
        >
          <Bus className="inline mr-1" size={16} />
          Buses
        </button>
      </div>

      <AnimatePresence>
        {mostrarViajes && viajes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-3 rounded-lg text-sm"
          >
            <p className="font-semibold mb-2">🚌 Buses disponibles:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {viajes.map((viaje) => (
                <li key={viaje.id}>
                  <strong>Bus:</strong> {viaje.numero_bus}, <strong>Salida:</strong> {new Date(viaje.salida).toLocaleString()}
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
