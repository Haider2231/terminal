import React, { useState } from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Sidebar from '../components/Sidebar';

/**
 * Componente Home - Página principal de la aplicación
 * Maneja el estado de la vista actual y la estructura general del layout
 * 
 * @returns {JSX.Element} Estructura principal de la aplicación
 */
function Home() {
  // Estado para controlar la vista actual (null: vista de inicio)
  const [view, setView] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Componente Header - Barra superior de navegación */}
      <Header setView={setView} />

      {/* Contenedor principal (flexible) que alberga Sidebar y MainContent */}
      <div className="flex flex-grow">
        {/* Componente Sidebar - Menú lateral de navegación */}
        <Sidebar 
          onSelect={setView}  // Pasa la función para cambiar la vista
        />

        {/* Componente MainContent - Área de contenido dinámico */}
        <MainContent 
          view={view}  // Vista actual a mostrar
        />
      </div>
    </div>
  );
}

export default Home;