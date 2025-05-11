import axios from 'axios';

const API_BASE_URL = 'http://localhost:4004/api'; // URL base de la API

// Obtener todas las rutas
export const getRutas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rutas`); // Realiza una solicitud GET a la API
    return response.data; // Retorna los datos de las rutas obtenidas
  } catch (error) {
    console.error('Error al obtener rutas:', error); // Si ocurre un error, lo imprime en consola
    throw error; // Lanza el error para ser manejado en otro lugar
  }
};

// Crear una nueva ruta
export const createRuta = async (ruta) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rutas`, ruta); // Solicita la creación de una nueva ruta
    return response.data; // Retorna los datos de la ruta creada
  } catch (error) {
    console.error('Error al crear la ruta:', error); // Error al crear la ruta
    throw error; // Lanza el error
  }
};

// Actualizar una ruta existente
export const updateRuta = async (id, ruta) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/rutas/${id}`, ruta); // Solicita la actualización de la ruta con el ID especificado
    return response.data; // Retorna los datos de la ruta actualizada
  } catch (error) {
    console.error('Error al actualizar la ruta:', error); // Error al actualizar la ruta
    throw error; // Lanza el error
  }
};

// Eliminar una ruta
export const deleteRuta = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/rutas/${id}`); // Solicita la eliminación de la ruta con el ID especificado
    return response.data; // Retorna los datos de la ruta eliminada
  } catch (error) {
    console.error('Error al eliminar la ruta:', error); // Error al eliminar la ruta
    throw error; // Lanza el error
  }
};

// Obtener las rutas de una empresa específica
export const getRutasPorEmpresa = async (empresaId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rutas/empresa/${empresaId}`); // Solicita las rutas para la empresa específica
    return response.data; // Retorna las rutas de la empresa
  } catch (error) {
    console.error('Error al obtener rutas por empresa:', error); // Error al obtener las rutas por empresa
    throw error; // Lanza el error
  }
};

// Obtener todas las empresas
export const getEmpresas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empresas`); // Solicita todas las empresas registradas
    return response.data; // Retorna las empresas obtenidas
  } catch (error) {
    console.error('Error al obtener empresas:', error); // Error al obtener las empresas
    throw error; // Lanza el error
  }
};
