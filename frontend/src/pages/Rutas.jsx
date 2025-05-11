import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRutas } from "../services/rutasService"; // Importamos el servicio para obtener las rutas

/**
 * Componente Rutas
 *
 * Este componente muestra un listado de las rutas disponibles. Al cargar el componente, se hace una solicitud a la API 
 * para obtener las rutas registradas. Si las rutas están disponibles, se muestran en una lista.
 * También permite al usuario ver el mapa de una ruta seleccionada, navegando a una página de mapa.
 */
function Rutas() {
  // Estado para almacenar las rutas
  const [rutas, setRutas] = useState([]);
  // Estado para manejar los mensajes de error o información
  const [mensaje, setMensaje] = useState("");
  // Navegación con react-router
  const navigate = useNavigate();

  // useEffect para cargar las rutas al montar el componente
  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const data = await getRutas(); // Llamada al servicio para obtener rutas
        if (data.length > 0) {
          setRutas(data); // Si hay rutas, las establecemos en el estado
          setMensaje(""); // Limpiamos el mensaje de error
        } else {
          setMensaje("No hay rutas registradas."); // Si no hay rutas, mostramos un mensaje
        }
      } catch (error) {
        setMensaje("Hubo un error al cargar las rutas."); // Si hay un error, mostramos un mensaje de error
      }
    };

    fetchRutas(); // Llamamos a la función para obtener las rutas
  }, []); // Solo se ejecuta al montar el componente

  /**
   * Función que maneja el clic en el botón "Ver Mapa" para una ruta específica.
   * Navega a la página de mapa y pasa la ruta seleccionada como estado.
   */
  const handleVerMapa = (ruta) => {
    navigate("/mapa", { state: { ruta } }); // Navegamos a la ruta de mapa pasando la información de la ruta
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Listado de Rutas</h2>

      {/* Si hay un mensaje, lo mostramos en rojo */}
      {mensaje && <p className="text-red-500">{mensaje}</p>}

      <ul>
        {/* Iteramos sobre las rutas y las mostramos en una lista */}
        {rutas.map((ruta) => (
          <li
            key={ruta.id}
            className="mb-2 p-4 bg-gradient-to-r from-[var(--color-300)] to-[var(--color-400)] text-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg flex justify-between items-center"
          >
            <div>
              <span className="font-semibold">
                {ruta.origen} → {ruta.destino}
              </span>
              <span className="ml-2 text-gray-200">({ruta.empresa})</span>
            </div>
            <button
              onClick={() => handleVerMapa(ruta)} // Llama a la función para ver el mapa de la ruta
              className="header-button"
            >
              Ver Mapa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rutas;
