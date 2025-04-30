const express = require('express');
const cors = require('cors');
const app = express();
const rutas = require('./routes/rutas'); // Importa tus rutas
const authRoutes = require('./routes/auth');

// Middlewares
app.use(cors());
app.use(express.json()); // Para poder leer JSON en las peticiones

// Usamos un prefijo para todas las rutas: /api
app.use('/api', rutas);
app.use('/api/auth', authRoutes);

// Puerto
const PORT = 4004;
app.listen(PORT, '0.0.0.0' ,() => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
