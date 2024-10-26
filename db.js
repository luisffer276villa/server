// src/server/db.js
const { Pool } = require('pg');

// Configura tu conexión
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Guatemala276',
  port: 5432, // El puerto predeterminado para PostgreSQL
  searchPath: ['votaciones'],   // Esquema al que quieres acceder
});

// Prueba de conexión
const testConnection = async () => {
    try {
      await pool.connect();
      console.log('Conexión a la base de datos PostgreSQL exitosa');
    } catch (err) {
      console.error('Error al conectar a la base de datos', err.stack);
    } finally {
      // Cerrar la conexión si deseas
     // await pool.end(); // Si no deseas mantener la conexión abierta, puedes cerrar aquí
    }
  };
  
  testConnection();
  
  module.exports = pool;
