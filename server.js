/**
 * @author luis villagran
 * @since 2/10/2024
 * @description Configuración de constantes para el uso de Express.js
 */
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3005;
const cors = require('cors');
const bodyParser = require('body-parser');

// Rutas
const authRoutes = require("../security/auth.js");
const userRoutes = require('../server/routes/userRoutes.js'); // Ajusta la ruta si es necesario
const campañaRoutes = require('../server/routes/campañaRoutes.js'); // Ajusta la ruta según tu estructura
const estadoRoutes = require('../server/routes/estadoRoutes.js'); // Ajusta la ruta según tu estructura
const detalleCampaña = require('../server/routes/votanteRoutes.js')
app.use(cors()); // Habilita CORS para todas las rutas

// Configuración de Express para recibir JSON
app.use(express.json()); 

// Importar y conectar a la base de datos
require('../server/db.js'); // Esto llamará a la función de prueba de conexión al iniciar el servidor

// Rutas
app.use('/auth', authRoutes);
app.use('/api', userRoutes); 
app.use('/api', campañaRoutes);
app.use('/api', estadoRoutes);
app.use('/api', detalleCampaña);
app.use(bodyParser.json()); // Permitir que Express maneje JSON

// Ruta básica para verificar el funcionamiento correcto de Express.js 
app.get('/', (req, res) => {
    res.send('Express está jalando chidito');
});
  
/* app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validar si el usuario es el correcto
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: "Tu usuario está incorrecto, nn ojito" });
    }

    // Validar si la contraseña es correcta
    const pass = bcrypt.compareSync(password, user.password);
    if (!pass) {
        return res.status(401).json({ message: "Tu contraseña es incorrecta, verifica nn" });
    }

    // Ejecución de JWT
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '2m' });
    res.json({ token });
});
 */
// Ruta protegida
app.get('/proteccion', (req, res) => {
    res.send('Esta ruta tiene protección nn, eso significa que ya jaló el JWT');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Express está escuchando en el puerto http://localhost:${port}`);
});
