import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ onSelect }) {
  return (
    <aside className="w-64 bg-[var(--color-800)] text-white p-6 space-y-4" style={{ border: '0.1px solid var(--color-lime)' }}>
      <button
        onClick={() => onSelect('buses')}
        className="w-full text-left px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        Agencias
      </button>
      <button
        onClick={() => onSelect('rutas')}
        className="w-full text-left px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
      >
        Rutas
      </button>
      <button
        onClick={() => onSelect('ComprarTicket')} // Asegúrate de que pase 'ComprarTicket'
        className="w-full text-left px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
      >
        Comprar Tickets
      </button>
    </aside>
  );
}

export default Sidebar;