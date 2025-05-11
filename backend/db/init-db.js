// init-db.js

// Importa la biblioteca 'sqlite3' y activa el modo verbose para obtener mensajes detallados
const sqlite3 = require('sqlite3').verbose();

// Importa el módulo 'path' para manejar rutas de archivos de manera segura
const path = require('path');

// Define la ruta absoluta hacia el archivo de base de datos SQLite
const dbPath = path.resolve(__dirname, 'database.db');

console.log('Inicializando base de datos...');

// Crea una nueva conexión con la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    // Muestra un error si no se puede conectar a la base de datos
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado correctamente a la base de datos SQLite');

    // Ejecuta los comandos de creación de tablas de forma secuencial
    db.serialize(() => {

      // Crea la tabla 'empresas' si no existe
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

      // Intenta agregar la columna 'tarifa' a la tabla 'rutas' (puede fallar si ya existe)
      db.run(`
        ALTER TABLE rutas ADD COLUMN tarifa REAL NOT NULL DEFAULT 0
      `, (err) => {
        if (err) {
          console.error('Error al agregar columna tarifa a la tabla rutas:', err.message);
        }
      });

      // Crea la tabla 'buses' si no existe
      db.run(`
        CREATE TABLE IF NOT EXISTS buses (
          id TEXT PRIMARY KEY,
          numero INTEGER NOT NULL,
          placa TEXT NOT NULL UNIQUE,
          conductor TEXT NOT NULL,
          ruta_id TEXT NOT NULL,
          horario TEXT NOT NULL,
          tipo TEXT CHECK(tipo IN ('ida', 'vuelta')) NOT NULL,
          agencia_id TEXT NOT NULL,
          FOREIGN KEY (ruta_id) REFERENCES rutas(id),
          FOREIGN KEY (agencia_id) REFERENCES agencias(id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creando tabla buses:', err.message);
        }
      });

      // Crea la tabla intermedia 'buses_rutas' para representar relaciones entre buses y rutas
      db.run(`
        CREATE TABLE IF NOT EXISTS buses_rutas (
          id TEXT PRIMARY KEY,
          bus_id TEXT NOT NULL,
          ruta_id TEXT NOT NULL,
          horario TEXT NOT NULL,
          tipo TEXT CHECK(tipo IN ('ida', 'vuelta')) NOT NULL,
          FOREIGN KEY (bus_id) REFERENCES buses(id),
          FOREIGN KEY (ruta_id) REFERENCES rutas(id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creando tabla buses_rutas:', err.message);
        }
      });

      // Crea la tabla 'rutas' si no existe
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

    // Cierra la conexión a la base de datos una vez finalizadas las operaciones
    db.close((err) => {
      if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
      } else {
        console.log('Tablas creadas correctamente.');
      }
    });
  }
});
