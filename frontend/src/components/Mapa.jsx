import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Mapa = () => {
  const location = useLocation();
  const ruta = location.state?.ruta;
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = ''; // Limpiar el contenedor del mapa
    }

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

    const loadGoogleMaps = () => {
      if (typeof google !== 'undefined') {
        console.log('✅ Google Maps script cargado');
        initializeMap();
      } else {
        console.error('❌ Google Maps no está definido.');
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAYDCSXtmUI-KR3qJ29oRdemNUpSIb-UDQ&libraries=places';
      script.async = true;
      script.defer = true;

      script.onload = loadGoogleMaps;
      script.onerror = () => {
        console.error('❌ Error al cargar el script de Google Maps.');
        mapContainer.innerHTML = '<p style="color: red; text-align: center;">Error al cargar el mapa.</p>';
      };

      document.body.appendChild(script);
    } else {
      loadGoogleMaps(); // Llamar directamente si el script ya está cargado
    }

    return () => {
      if (existingScript) {
        existingScript.removeEventListener('load', loadGoogleMaps);
      }
    };
  }, [ruta]);

  const initializeMap = () => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('❌ No se encontró el contenedor del mapa en el DOM.');
      return;
    }

    const map = new google.maps.Map(mapContainer, {
      center: { lat: 0, lng: 0 }, // Coordenadas iniciales
      zoom: 8,
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const geocoder = new google.maps.Geocoder();

    // Geocodificar origen y destino
    geocoder.geocode({ address: ruta.origen }, (resultsOrigen, statusOrigen) => {
      if (statusOrigen === 'OK' && resultsOrigen[0]) {
        geocoder.geocode({ address: ruta.destino }, (resultsDestino, statusDestino) => {
          if (statusDestino === 'OK' && resultsDestino[0]) {
            const request = {
              origin: resultsOrigen[0].geometry.location,
              destination: resultsDestino[0].geometry.location,
              travelMode: google.maps.TravelMode.DRIVING,
            };

            directionsService.route(request, (result, status) => {
              if (status === 'OK') {
                directionsRenderer.setDirections(result);
                extractMunicipios(result.routes[0].legs[0].steps, geocoder);
              } else {
                console.error('❌ Error al calcular la ruta:', status);
              }
            });
          } else {
            console.error('❌ Error al geocodificar el destino:', statusDestino);
          }
        });
      } else {
        console.error('❌ Error al geocodificar el origen:', statusOrigen);
      }
    });
  };

  const extractMunicipios = (steps, geocoder) => {
    const municipiosSet = new Set();

    steps.forEach((step) => {
      const location = step.end_location;
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const municipio = results[0].address_components.find((component) =>
            component.types.includes('locality') || component.types.includes('administrative_area_level_2')
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
      <div id="map" style={{ height: '50vh', width: '100%' }} />
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
