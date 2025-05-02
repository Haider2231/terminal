const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
//const pool = require('./db/connection'); // Importar conexión a PostgreSQL
const app = express();


// Importar rutas
const rutas = require('./routes/rutas');
const viajes = require('./routes/viajes');
const usuarios = require('./routes/usuarios');
const tiquetes = require('./routes/tiquetes');
const roles = require('./routes/roles');
const municipios = require('./routes/municipios');
const empresas = require('./routes/empresas');
const buses = require('./routes/buses');
const rutasMunicipio = require('./routes/rutas_municipio');

// Middlewares
app.use(cors());
app.use(express.json()); // Para poder leer JSON en las peticiones

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Registrar rutas con prefijo /api
app.use('/api/', rutas);
app.use('/api/', viajes);
app.use('/api/', usuarios);
app.use('/api/', tiquetes);
app.use('/api/', roles);
app.use('/api/', municipios);
app.use('/api/', empresas);
app.use('/api/', buses);
app.use('/api/', rutasMunicipio);

// Ejemplo de uso del middleware en una ruta protegida
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Acceso autorizado', user: req.user });
});

// Puerto
const PORT = 4004;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
