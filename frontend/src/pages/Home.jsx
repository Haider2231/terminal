import React, { useState } from "react";
import Header from "../components/Header"; // Importamos el componente Header
import MainContent from "../components/MainContent"; // Importamos el componente MainContent
import Sidebar from "../components/Sidebar"; // Importamos el componente Sidebar

/**
 * Componente Home
 *
 * Este es el componente principal que representa la vista de inicio de la aplicación.
 * Contiene tres componentes principales: Header, Sidebar y MainContent.
 * Utiliza el hook `useState` para manejar el estado de la vista seleccionada.
 */
function Home() {
  // Estado para manejar la vista seleccionada (por ejemplo, 'buses', 'rutas', etc.)
  const [view, setView] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Componente Header */}
      <Header setView={setView} />

      {/* Área de contenido principal */}
      <div className="flex flex-grow">
        {/* Componente Sidebar */}
        <Sidebar onSelect={setView} />

        {/* Componente MainContent, que recibe la vista seleccionada */}
        <MainContent view={view} />
      </div>
    </div>
  );
}

export default Home;
