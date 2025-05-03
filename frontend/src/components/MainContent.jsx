import React from 'react';
import Buses from '../pages/Buses';
import Rutas from '../pages/Rutas';
import ComprarTicket from '../pages/ComprarTicket'; // Importar el componente

function MainContent({ view }) {
  return (
    <main className="flex-grow bg-white p-6" style={{ border: '0.1px solid var(--color-lime)' }}>
      {view === null && (
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4">Bienvenido a Terminal</h2>
          <p className="text-lg text-gray-700 mb-8">
            Selecciona una opción para explorar nuestras rutas y buses.
          </p>
        </div>
      )}
      {view === 'buses' && <Buses />}
      {view === 'rutas' && <Rutas />}
      {view === 'ComprarTicket' && <ComprarTicket />} {/* Renderizar ComprarTicket */}
    </main>
  );
}

export default MainContent;