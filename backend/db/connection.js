// Importa la biblioteca 'sqlite3' y habilita el modo verbose para obtener más información útil durante el desarrollo
const sqlite3 = require('sqlite3').verbose();

// Importa el módulo 'path' para manejar rutas de archivos de forma segura y multiplataforma
const path = require('path');

// Define la ruta absoluta hacia el archivo de la base de datos SQLite llamado 'database.db'
const dbPath = path.resolve(__dirname, 'database.db');

// Crea una nueva instancia de la base de datos SQLite usando la ruta definida
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    // Si ocurre un error al intentar conectarse, se imprime un mensaje en la consola
    console.error('Error al conectar a la base de datos', err.message);
  } else {
    // Si la conexión es exitosa, se muestra un mensaje de confirmación
    console.log('Conectado a la base de datos SQLite');
  }
});

// Exporta la instancia de la base de datos para que pueda ser utilizada en otros módulos del proyecto
module.exports = db;