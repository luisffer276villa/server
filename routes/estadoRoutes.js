const express = require('express');
const pool = require('../db'); // Tu conexión a la base de datos
const router = express.Router();

// Ruta para obtener estados
router.get('/estados', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM votaciones.estados'); // Ajusta la consulta según tu esquema de base de datos
      res.json(result.rows); // Devuelve la lista de estados
    } catch (error) {
      console.error('Error al obtener estados:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  });
  
  module.exports = router;
