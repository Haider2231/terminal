// Importa React y los componentes que se mostrarán según la vista seleccionada
import React from 'react';
import Buses from '../pages/Buses';
import Rutas from '../pages/Rutas';

/**
 * Componente principal de contenido dinámico.
 * Muestra contenido diferente basado en la propiedad "view".
 * 
 * Props:
 * - view: una cadena que determina qué componente mostrar ('buses', 'rutas' o null)
 */
function MainContent({ view }) {
  return (
    // Contenedor principal con estilos de crecimiento flexible y fondo blanco
    <main className="flex-grow bg-white p-6" style={{ border: '0.1px solid var(--color-lime)' }}>
      
      {/* Vista por defecto (cuando no se ha seleccionado ninguna opción) */}
      {view === null && (
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4">Bienvenido a Terminal</h2>
          <p className="text-lg text-gray-700 mb-8">
            Selecciona una opción para explorar nuestras rutas y buses.
          </p>
        </div>
      )}

      {/* Muestra el componente Buses si la vista seleccionada es "buses" */}
      {view === 'buses' && <Buses />}

      {/* Muestra el componente Rutas si la vista seleccionada es "rutas" */}
      {view === 'rutas' && <Rutas />}
    </main>
  );
}

// Exporta el componente para su uso en otras partes de la app
export default MainContent;
