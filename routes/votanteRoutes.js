const express = require('express');
const pool = require('../db'); // Tu conexión a la base de datos
const router = express.Router();

// Obtener los detalles de una campaña por ID
router.get('/campanas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('select c.id_campaña , c.titulo , c.descripcion from votaciones.campañas c where c.id_campaña = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Campaña no encontrada' });
        }

        res.json(result.rows[0]); // Devolvemos la primera (y única) fila
    } catch (error) {
        console.error('Error al obtener campaña:', error);
        res.status(500).json({ message: 'Error al obtener la campaña' });
    }
});



module.exports = router;


//metodo para obtener los votantes en base al id de la campaña.
router.get('/campanas/:id/votantes', async (req, res) => {
    const { id } = req.params;
    console.log(id + "este es el id para el candidato")
    try {
        const result = await pool.query(`select u.nombre, u.correo_electronico, u.numero_colegiado from votaciones.candidatos c inner join votaciones.usuarios u on u.numero_colegiado = c.id_candidato where c.id_campaña = $1`, [id]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los votantes:', error);
        res.status(500).json({ message: 'Error al obtener los votantes' });
    }
});


//metodo para votar por un candidato
router.post('/votar', async (req, res) => {
    const { id_campaña, id_candidato } = req.body; // Obtenemos los datos del voto desde el body

    if (!id_campaña || !id_candidato) {
        return res.status(400).json({ message: 'Datos incompletos. Se necesita el ID de la campaña y el ID del candidato.' });
    }

    try {
        // Insertar el voto en la tabla de votos
        const result = await pool.query(
            'UPDATE votaciones.candidatos SET votos = votos + 1 WHERE id_campaña = $1 AND id_candidato = $2 RETURNING *',
            [id_campaña, id_candidato]
        );

        res.status(201).json({ message: 'Voto registrado exitosamente', voto: result.rows[0] });
    } catch (error) {
        console.error('Error al registrar el voto:', error);
        res.status(500).json({ message: 'Error al registrar el voto' });
    }
});

//metodo para obtener los votos de un candidato
// Ruta para obtener los votos de los candidatos
router.get('/campanas/:id/votos', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
                select u.nombre, c.id_candidato , c.votos from votaciones.candidatos c 
    inner join votaciones.usuarios u on
    c.numero_colegiado = u.numero_colegiado 
    where c.id_campaña = $1
        `, [id]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los votos:', error);
        res.status(500).json({ message: 'Error al obtener los votos' });
    }
});


