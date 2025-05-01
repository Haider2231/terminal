import axios from 'axios';

const API_BASE_URL = 'http://localhost:4004/api';

// Obtener todos los viajes
export const getViajes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/viajes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener viajes:', error);
    throw error;
  }
};

// Crear un nuevo viaje
export const createViaje = async (viaje) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viajes`, viaje);
    return response.data;
  } catch (error) {
    console.error('Error al crear el viaje:', error);
    throw error;
  }
};

// Actualizar un viaje
export const updateViaje = async (id, viaje) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/viajes/${id}`, viaje);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el viaje:', error);
    throw error;
  }
};

// Eliminar un viaje
export const deleteViaje = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/viajes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el viaje:', error);
    throw error;
  }
};

// Función para obtener los viajes de una ruta específica
export const getViajesPorRuta = async (rutaId) => {
  try {
    const response = await axios.get(`/api/viajes/ruta/${rutaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los viajes:', error);
    throw error;
  }
};