import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Mapa = () => {
  const location = useLocation();
  const ruta = location.state?.ruta;

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('❌ No se encontró el contenedor del mapa en el DOM.');
      return;
    }

    if (!ruta || !ruta.origen || !ruta.destino) {
      console.error('❌ La ruta proporcionada no es válida:', ruta);
      mapContainer.innerHTML = '<p style="color: red; text-align: center;">No se pudo cargar el mapa. Verifique la ruta.</p>';
      return;
    }

    const scriptId = 'google-maps-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAYDCSXtmUI-KR3qJ29oRdemNUpSIb-UDQ&libraries=places';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('✅ Google Maps script cargado');
        initializeMap();
      };

      script.onerror = () => {
        console.error('❌ Error al cargar el script de Google Maps.');
        mapContainer.innerHTML = '<p style="color: red; text-align: center;">Error al cargar el mapa.</p>';
      };

      document.body.appendChild(script);
    } else {
      initializeMap();
    }

  
  }, [ruta]);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default Mapa;
