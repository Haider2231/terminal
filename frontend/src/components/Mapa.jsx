// Importa React y el hook useEffect para manejar efectos secundarios
import React, { useEffect } from 'react';
// Importa el hook useLocation de React Router para acceder al estado de navegación
import { useLocation } from 'react-router-dom';

/**
 * Componente Mapa
 * 
 * Este componente muestra un mapa de Google Maps basado en una ruta
 * que se recibe como parte del estado de navegación (location.state).
 * 
 * Requiere que la ruta contenga los campos `origen` y `destino`.
 */
const Mapa = () => {
  // Obtiene la ubicación actual y extrae la ruta desde el estado
  const location = useLocation();
  const ruta = location.state?.ruta;

  useEffect(() => {
    // Obtiene el contenedor del mapa del DOM
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('❌ No se encontró el contenedor del mapa en el DOM.');
      return;
    }

    // Verifica que la ruta tenga origen y destino válidos
    if (!ruta || !ruta.origen || !ruta.destino) {
      console.error('❌ La ruta proporcionada no es válida:', ruta);
      mapContainer.innerHTML = '<p style="color: red; text-align: center;">No se pudo cargar el mapa. Verifique la ruta.</p>';
      return;
    }

    const scriptId = 'google-maps-script';

    // Si el script de Google Maps no está cargado, lo carga dinámicamente
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAYDCSXtmUI-KR3qJ29oRdemNUpSIb-UDQ&libraries=places';
      script.async = true;
      script.defer = true;

      // Una vez cargado el script, inicializa el mapa
      script.onload = () => {
        console.log('✅ Google Maps script cargado');
        initializeMap(); // ⚠️ Este método no está definido en el componente actual
      };

      // Muestra un mensaje si falla la carga del script
      script.onerror = () => {
        console.error('❌ Error al cargar el script de Google Maps.');
        mapContainer.innerHTML = '<p style="color: red; text-align: center;">Error al cargar el mapa.</p>';
      };

      // Agrega el script al DOM
      document.body.appendChild(script);
    } else {
      // Si ya está cargado, simplemente inicializa el mapa
      initializeMap(); // ⚠️ Este método tampoco está definido en este bloque
    }

  }, [ruta]); // Se ejecuta cada vez que cambia la ruta

  // Renderiza un div que actuará como contenedor del mapa
  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default Mapa;
