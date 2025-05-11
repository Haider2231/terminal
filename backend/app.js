// Importa el framework Express para crear el servidor web
const express = require('express');
// Importa CORS para permitir solicitudes desde otros dominios
const cors = require('cors');
// Crea una instancia de la aplicación Express
const app = express();
// Importa el archivo de rutas donde se definen los endpoints
const rutas = require('./routes/rutas'); 

/**
 * ========================
 * MIDDLEWARES DE LA APP
 * ========================
 */

// Habilita CORS para permitir peticiones desde otros orígenes (por ejemplo, desde el frontend)
app.use(cors());

// Middleware para permitir que Express entienda cuerpos de peticiones en formato JSON
app.use(express.json());

/**
 * ========================
 * DEFINICIÓN DE RUTAS
 * ========================
 */

// Prefijo '/api' para todas las rutas definidas en ./routes/rutas.js
app.use('/api', rutas);

/**
 * ========================
 * INICIALIZACIÓN DEL SERVIDOR
 * ========================
 */

// Puerto en el que se levantará el servidor backend
const PORT = 4004;

// Inicia el servidor y lo hace accesible desde cualquier IP (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
