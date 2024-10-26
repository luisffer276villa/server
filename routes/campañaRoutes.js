const express = require('express');
const pool = require('../db'); // Tu conexión a la base de datos
const router = express.Router();

// Ruta para crear una nueva campaña
router.post('/campanas', async (req, res) => {
  const { titulo, descripcion, estado } = req.body;
  const fecha_creacion = new Date();
  const usuario = "lfvillag"
  try {
    console.log(req.body)
    const query = 'INSERT INTO votaciones.campañas (titulo, descripcion, id_estado, usuario_creacion, fecha_creacion) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const result = await pool.query(query, [titulo, descripcion, 1, usuario, fecha_creacion ]);
    console.log(result)
    res.status(201).json(result.rows[0]); // Devolver la campaña recién creada
  } catch (error) {
    console.error('Error al crear campaña lol:', error);
    res.status(500).json({ message: 'Error al crear la campaña' });
  }
});

// Ruta para obtener las campañas creadas.
router.get('/listCampanas', async (req, res)=>{
    try{
        const result = await pool.query('select * , e.descripcion  as nestado , c.descripcion as texto from votaciones.campañas c inner join votaciones.estados e on e.id_estado = c.id_estado where c.id_estado = 1');
        //console.log(res.json(result.rows))
        res.status(200).json(result.rows)
    }
    catch (error) {
        console.error('Error al obtener campañas:', error);
        res.status(500).json({ message: 'Error al obtener campañas' });
      }
});

//Ruta para obtener todos los candidatos
router.get('/candidatos', async(req, res) =>{
    try{
        const result = await pool.query('select c.id_candidato , c.numero_colegiado, u.nombre from votaciones.candidatos c inner join votaciones.usuarios u on u.numero_colegiado = c.numero_colegiado ');
        res.json(result.rows);
    }catch (error) {
        console.error('Error al obtener candidatos:', error);
        res.status(500).json({ message: 'Error al obtener campañas' });
      }
})

//Obtener campaña en base a su ID
router.get('/campana/:id', async(req, res)=>{
    const {id} = req.params;
    try{
        const result = await pool.query('select * from votaciones.campañas c where c.id_campaña = $1', [id])
        return res.json(result.rows[0]); // Devolver la campaña encontrada
    }
    catch (error) {
        console.error('Error al obtener campaña por ID:', error);
        res.status(500).json({ message: 'Error al obtener campañas' });
      }
})

//Actualizar una campaña
// En tu archivo de rutas (ej. campanaRoutes.js)
router.put('/campana/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const { titulo, descripcion, id_estado } = req.body; // Se esperan estos valores en el cuerpo de la solicitud
  console.log(titulo + descripcion + id_estado)
  try {
      const query = `
          UPDATE votaciones.campañas 
          SET titulo = $1, descripcion = $2, id_estado = $3
          WHERE id_campaña = $4
      `;
      const values = [titulo, descripcion, id_estado, id];

      const result = await pool.query(query, values);

      if (result.rowCount > 0) {
          res.status(200).json({ message: 'Campaña actualizada correctamente.' });
      } else {
          res.status(404).json({ message: 'Campaña no encontrada.' });
      }
  } catch (error) {
      console.error('Error al actualizar la campaña:', error);
      res.status(500).json({ message: 'Error al actualizar la campaña.' });
  }
});


//Asignar candidato a campaña
router.put('/campana/:idCampana/candidato/:idCandidato', async (req, res) => {
  const { idCampana, idCandidato } = req.params; // Obtener el id de campaña y el candidato desde los parámetros de la ruta
  console.log(idCampana + "-" + idCandidato)
  const query = `UPDATE votaciones.candidatos SET id_campaña = $1 WHERE id_candidato = $2`;

  try {
      const result = await pool.query(query, [idCampana, idCandidato]);
      if (result.rowCount > 0) {
          res.status(200).json({ message: 'Candidato actualizado correctamente' });
      } else {
          res.status(404).json({ message: 'Candidato no encontrado' });
      }
  } catch (error) {
      console.error('Error al actualizar el candidato:', error);
      res.status(500).json({ message: 'Error al actualizar el candidato' });
  }
});
module.exports = router;
