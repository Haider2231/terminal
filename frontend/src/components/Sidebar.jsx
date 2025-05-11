import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente Sidebar que muestra un menú lateral con opciones de navegación
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onSelect - Función callback que se ejecuta al seleccionar una opción
 *                                  Recibe el nombre de la vista seleccionada ('buses', 'rutas' o 'ComprarTicket')
 */
function Sidebar({ onSelect }) {
  return (
    <aside 
      className="w-64 bg-[var(--color-800)] text-white p-6 space-y-4" 
      style={{ border: '0.1px solid var(--color-lime)' }}
      aria-label="Menú principal"
    >
      {/* Botón para la sección de Agencias */}
      <button
        onClick={() => onSelect('buses')}
        className="w-full text-left px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        aria-label="Ver agencias de buses"
      >
        Agencias
      </button>

      {/* Botón para la sección de Rutas */}
      <button
        onClick={() => onSelect('rutas')}
        className="w-full text-left px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
        aria-label="Ver rutas disponibles"
      >
        Rutas
      </button>

      {/* Botón para la sección de Compra de Tickets */}
      <button
        onClick={() => onSelect('ComprarTicket')}
        className="w-full text-left px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded transition-colors"
        aria-label="Comprar tickets de viaje"
      >
        Comprar Tickets
      </button>
    </aside>
  );
}

export default Sidebar;