import React from "react";

/**
 * Componente Sidebar
 *
 * Este componente representa una barra lateral de navegación con botones
 * que permiten al usuario seleccionar entre las vistas "buses" y "rutas".
 *
 * Props:
 * - onSelect: función que se ejecuta cuando el usuario selecciona una opción.
 */
function Sidebar({ onSelect }) {
  return (
    <aside
      // Contenedor lateral con ancho fijo y fondo oscuro
      className="w-64 bg-[var(--color-800)] text-white p-6 space-y-4"
      style={{ border: "0.1px solid var(--color-lime)" }}
    >
      {/* Botón para seleccionar la vista de buses */}
      <button
        onClick={() => onSelect("buses")}
        className="w-full text-left px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        Buses
      </button>

      {/* Botón para seleccionar la vista de rutas */}
      <button
        onClick={() => onSelect("rutas")}
        className="w-full text-left px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
      >
        Rutas
      </button>
    </aside>
  );
}

export default Sidebar;
