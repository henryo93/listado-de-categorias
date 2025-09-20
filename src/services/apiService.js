import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio para obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await apiClient.get('/categories');
    return {
      success: true,
      data: response.data,
      message: 'Categorías obtenidas exitosamente'
    };
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    
    let errorMessage = 'Error desconocido';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Tiempo de espera agotado. Verifique su conexión a internet.';
    } else if (error.response) {
      // Error del servidor
      errorMessage = `Error del servidor: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // Error de red
      errorMessage = 'Error de conexión. Verifique su conexión a internet.';
    }
    
    return {
      success: false,
      data: [],
      message: errorMessage
    };
  }
};

// Validar URL de imagen
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// URL de imagen por defecto si la imagen falla
export const DEFAULT_IMAGE = 'https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=Sin+Imagen';

export default {
  getCategorias,
  isValidImageUrl,
  DEFAULT_IMAGE
};