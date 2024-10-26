import axios from 'axios';

export const createUser = async (userData) => {
  try {
    console.log("Enviando datos al servidor:", userData);
    const response = await axios.post('http://localhost:3005/api/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error al enviar datos al servidor:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// userService.js
export const getProtectedData = async () => {
  const token = localStorage.getItem('token'); // Obtener el token almacenado
  const response = await fetch('http://localhost:3005/protected-route', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // Enviar el token en los headers
    },
  });

  if (!response.ok) {
    throw new Error('Error al acceder a la ruta protegida');
  }

  return await response.json();
};
