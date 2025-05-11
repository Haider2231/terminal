// src/components/FABRutas.jsx
import React from 'react';
import { Plus, Map } from 'lucide-react';

/**
 * Componente Floating Action Button (FAB) para acciones de rutas
 * @param {function} onClick - Función que se ejecuta al hacer clic en el botón
 * @param {string} [icon='plus'] - Tipo de ícono a mostrar ('plus' o 'map')
 * @param {string} [label='Acción'] - Texto descriptivo para accesibilidad (solo visible para lectores de pantalla)
 */
function FabRutas({ onClick, icon = 'plus', label = 'Acción' }) {
  // Selecciona el ícono basado en la prop 'icon'
  const Icon = icon === 'map' ? Map : Plus;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center"
    >
      {/* Renderiza el ícono seleccionado */}
      <Icon size={24} />
      {/* Etiqueta accesible para lectores de pantalla */}
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default FabRutas;