const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
//const verifyToken = require('../../security/privateRoute.js'); // Middleware de verificación de token

// Ruta para crear un usuario
router.post('/users', userController.createUser);
// Ruta para ingresar
/* router.get('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'Acceso permitido a ruta protegida', userId: req.userId });
  }); */

module.exports = router;
