const pool = require('../db');
const bcrypt = require('bcryptjs'); // Asegúrate de requerir bcrypt

exports.createUser = async (req, res) => {
  const { numeroColegiado, dpi, nombre, correo, clave, fechaNacimiento, tipoUsuario } = req.body;

  try {
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10); // Genera el salt con un factor de complejidad de 10
    const hashedPassword = bcrypt.hashSync(clave, salt); // Encripta la contraseña con el salt

    // Insertar el usuario con la contraseña encriptada
    const result = await pool.query(
      'INSERT INTO votaciones.usuarios (numero_colegiado, nombre, correo_electronico, dpi, fecha_nacimiento, contraseña, id_tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [numeroColegiado, nombre, correo, dpi, fechaNacimiento, hashedPassword, tipoUsuario]
    );

    console.log('Usuario creado:', result.rows[0]);  // Confirmación de que se insertó correctamente
    res.status(201).json(result.rows[0]);  // Devuelve el nuevo usuario insertado
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
};