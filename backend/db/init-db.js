// init-db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.db');

console.log('Inicializando base de datos...');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado correctamente a la base de datos SQLite');

    db.serialize(() => {
      // Crear tabla de empresas
      db.run(`
        CREATE TABLE IF NOT EXISTS empresas (
          id TEXT PRIMARY KEY,
          nombre TEXT NOT NULL
        )
      `, (err) => {
        if (err) {
          console.error('Error creando tabla empresas:', err.message);
        }
      });

      // Crear tabla de rutas
      db.run(`
        CREATE TABLE IF NOT EXISTS rutas (
          id TEXT PRIMARY KEY,
          nombre TEXT NOT NULL,
          origen TEXT NOT NULL,
          destino TEXT NOT NULL,
          empresa_id TEXT NOT NULL,
          FOREIGN KEY (empresa_id) REFERENCES empresas(id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creando tabla rutas:', err.message);
        }
      });
    });

    // Crear tabla de usuarios
    db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nombre TEXT,
    empresa_id TEXT,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
  )
`, (err) => {
      if (err) console.error('Error creando tabla usuarios:', err.message);
    });

    db.close((err) => {
      if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
      } else {
        console.log('Tablas creadas correctamente.');
      }
    });
  }
});
