import React from 'react';
import Buses from '../pages/Buses';
import Rutas from '../pages/Rutas';
import ComprarTicket from '../pages/ComprarTicket';

/**
 * Componente principal que renderiza contenido dinámico basado en la vista seleccionada
 * @param {Object} props - Propiedades del componente
 * @param {string|null} props.view - Determina qué componente mostrar:
 *   - null: Muestra vista de bienvenida
 *   - 'buses': Muestra componente de buses
 *   - 'rutas': Muestra componente de rutas
 *   - 'ComprarTicket': Muestra componente de compra de tickets
 */
function MainContent({ view }) {
  return (
    <main 
      className="flex-grow bg-white p-6" 
      style={{ border: '0.1px solid var(--color-lime)' }}
    >
      {/* Vista de bienvenida por defecto */}
      {view === null && (
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4">Bienvenido a Terminal</h2>
          <p className="text-lg text-gray-700 mb-8">
            Selecciona una opción para explorar nuestras rutas y buses.
          </p>
        </div>
      )}

      {/* Renderizado condicional de componentes */}
      {view === 'buses' && <Buses />}
      {view === 'rutas' && <Rutas />}
      {view === 'ComprarTicket' && <ComprarTicket />}
    </main>
  );
}

export default MainContent;