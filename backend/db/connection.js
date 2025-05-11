const { Pool } = require('pg');
require('dotenv').config({ path: './db/.env' }); // Carga explícita del archivo .env desde la carpeta db

/**
 * Configuración y creación del pool de conexiones PostgreSQL
 */
const pool = new Pool({
  host: process.env.DB_HOST,       // Host de la base de datos
  port: process.env.DB_PORT,       // Puerto de conexión
  user: process.env.DB_USER,       // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_NAME,   // Nombre de la base de datos
});

/**
 * Prueba de conexión a la base de datos
 * - Muestra mensaje de éxito si la conexión es exitosa
 * - Termina el proceso con código 1 si hay error
 */
pool.connect()
  .then(() => console.log('Conexión exitosa a PostgreSQL'))
  .catch(err => {
    console.error('Error conectando a PostgreSQL:', err.message);
    process.exit(1);  // Finaliza la aplicación con código de error
  });

// Exporta el pool para ser utilizado en otros módulos
module.exports = pool;