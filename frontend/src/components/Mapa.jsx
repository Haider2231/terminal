import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente Mapa que muestra una ruta entre dos puntos usando Google Maps API
 * y lista los municipios por los que pasa la ruta
 */
const Mapa = () => {
  // Obtener la ruta de la ubicación actual (pasada como state en la navegación)
  const location = useLocation();
  const ruta = location.state?.ruta;
  
  // Estado para almacenar los municipios encontrados en la ruta
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    // Limpiar el contenedor del mapa antes de inicializar
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = '';
    }

    // Validaciones iniciales
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
    const existingScript = document.getElementById(scriptId);

    /**
     * Función que se ejecuta cuando el script de Google Maps se carga correctamente
     */
    const loadGoogleMaps = () => {
      if (typeof google !== 'undefined') {
        console.log('✅ Google Maps script cargado');
        initializeMap();
      } else {
        console.error('❌ Google Maps no está definido.');
      }
    };

    // Cargar el script de Google Maps si no existe
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAYDCSXtmUI-KR3qJ29oRdemNUpSIb-UDQ&libraries=places';
      script.async = true;
      script.defer = true;

      script.onload = loadGoogleMaps;
      script.onerror = () => {
        console.error('❌ Error al cargar el script de Google Maps.');
        mapContainer.innerHTML = '<p style="color: red; text-align: center;">Error al cargar el mapa.</p>';
      };

      document.body.appendChild(script);
    } else {
      loadGoogleMaps(); // Si el script ya está cargado, inicializar el mapa directamente
    }

    return () => {
      if (existingScript) {
        existingScript.removeEventListener('load', loadGoogleMaps);
      }
    };
  }, [ruta]);

  /**
   * Inicializa el mapa de Google y calcula la ruta entre origen y destino
   */
  const initializeMap = () => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Configuración inicial del mapa
    const map = new google.maps.Map(mapContainer, {
      center: { lat: 0, lng: 0 }, // Centro inicial (se actualizará con la ruta)
      zoom: 8,
    });

    // Servicios de Google Maps
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const geocoder = new google.maps.Geocoder();

    // Geocodificar origen y destino para obtener sus coordenadas
    geocoder.geocode({ address: ruta.origen }, (resultsOrigen, statusOrigen) => {
      if (statusOrigen !== 'OK' || !resultsOrigen[0]) {
        console.error('❌ Error al geocodificar el origen:', statusOrigen);
        return;
      }

      geocoder.geocode({ address: ruta.destino }, (resultsDestino, statusDestino) => {
        if (statusDestino !== 'OK' || !resultsDestino[0]) {
          console.error('❌ Error al geocodificar el destino:', statusDestino);
          return;
        }

        // Configurar la solicitud de ruta
        const request = {
          origin: resultsOrigen[0].geometry.location,
          destination: resultsDestino[0].geometry.location,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        // Calcular y mostrar la ruta
        directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
            extractMunicipios(result.routes[0].legs[0].steps, geocoder);
          } else {
            console.error('❌ Error al calcular la ruta:', status);
          }
        });
      });
    });
  };

  /**
   * Extrae los municipios por los que pasa la ruta
   * @param {Array} steps - Pasos de la ruta calculada
   * @param {Object} geocoder - Instancia del geocodificador de Google Maps
   */
  const extractMunicipios = (steps, geocoder) => {
    const municipiosSet = new Set();

    steps.forEach((step) => {
      const location = step.end_location;
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          // Buscar el componente de dirección que representa el municipio
          const municipio = results[0].address_components.find((component) =>
            component.types.includes('locality') || 
            component.types.includes('administrative_area_level_2')
          );
          
          if (municipio) {
            municipiosSet.add(municipio.long_name);
            setMunicipios(Array.from(municipiosSet));
          }
        }
      });
    });
  };

  return (
    <div>
      {/* Contenedor del mapa de Google */}
      <div id="map" style={{ height: '50vh', width: '100%' }} />
      
      {/* Lista de municipios encontrados en la ruta */}
      <div>
        <h3>Municipios en la ruta:</h3>
        <ul>
          {municipios.map((municipio, index) => (
            <li key={index}>{municipio}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Mapa;