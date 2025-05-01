const { Pool } = require('pg');
require('dotenv').config({ path: './db/.env' }); // Cargar explícitamente el archivo .env

// Crear un "pool" de conexiones a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Probar conexión
pool.connect()
  .then(() => console.log('🟢 Conexión exitosa a PostgreSQL'))
  .catch(err => {
    console.error('🔴 Error conectando a PostgreSQL:', err.message);
    process.exit(1);
  });

module.exports = pool;