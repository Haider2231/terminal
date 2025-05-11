import React, { useEffect, useState } from "react";
import { getEmpresas, getRutasPorEmpresa } from "../services/rutasService"; // Importamos el servicio de rutas y empresas

/**
 * Componente Buses
 *
 * Este componente muestra una lista de empresas (representadas aquí como "buses"),
 * y al seleccionar una empresa, muestra las rutas asociadas a ella.
 *
 * Utiliza el hook `useEffect` para cargar automáticamente los datos al montar
 * el componente, y `useState` para manejar el estado interno.
 */
function Buses() {
  const [buses, setBuses] = useState([]); // Lista de empresas
  const [rutas, setRutas] = useState([]); // Lista de rutas de la empresa seleccionada
  const [selectedBus, setSelectedBus] = useState(null); // Empresa seleccionada
  const [mensaje, setMensaje] = useState(""); // Mensaje informativo o de error

  // Al montar el componente, se cargan las empresas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const data = await getEmpresas(); // Llamada al servicio para obtener empresas
        if (data.length > 0) {
          setBuses(data); // Se actualiza el estado con las empresas
          setMensaje("");
        } else {
          setMensaje("No hay empresas registradas.");
        }
      } catch (error) {
        setMensaje("Hubo un error al cargar las empresas.");
      }
    };

    fetchEmpresas(); // Se ejecuta la función de carga
  }, []);

  /**
   * Maneja el clic sobre una empresa.
   * Actualiza la empresa seleccionada y carga sus rutas correspondientes.
   *
   * @param {Object} bus Empresa seleccionada
   */
  const handleBusClick = async (bus) => {
    setSelectedBus(bus); // Se selecciona la empresa
    try {
      const data = await getRutasPorEmpresa(bus.id); // Se obtienen rutas de la empresa
      if (data.length > 0) {
        setRutas(data); // Se actualiza el estado con las rutas
        setMensaje("");
      } else {
        setMensaje("No hay rutas registradas para esta empresa.");
      }
    } catch (error) {
      setMensaje("Hubo un error al cargar las rutas.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Buses</h2>

      {/* Mostrar mensaje de error o informativo si lo hay */}
      {mensaje && <p className="text-red-500">{mensaje}</p>}

      {/* Renderiza la lista de empresas como botones tipo radio */}
      <div className="radio-inputs">
        {buses.map((bus) => (
          <label key={bus.id} className="radio-tile">
            <input
              type="radio"
              name="bus"
              className="radio-input"
              onChange={() => handleBusClick(bus)}
            />
            <span className="radio-label">{bus.nombre}</span>
          </label>
        ))}
      </div>

      {/* Mostrar las rutas solo si hay una empresa seleccionada con rutas */}
      {selectedBus && rutas.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Rutas de {selectedBus.nombre}</h3>
          <ul className="mt-2 list-disc list-inside">
            {rutas.map((ruta) => (
              <li key={ruta.id}>
                {ruta.origen} → {ruta.destino}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Buses;
