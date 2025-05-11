// Importa el framework Express para gestionar rutas y solicitudes HTTP
const express = require('express');
// Crea una instancia del enrutador de Express
const router = express.Router();
// Importa la conexión a la base de datos SQLite
const db = require('../db/connection');

/**
 * =============================
 * RUTAS PARA EL RECURSO EMPRESAS
 * =============================
 */

// Obtener todas las empresas
router.get('/empresas', (req, res) => {
  db.all('SELECT * FROM empresas', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows); // Devuelve todas las empresas como JSON
  });
});

// Crear una nueva empresa
router.post('/empresas', (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }
  // Inserta una nueva empresa en la base de datos
  db.run('INSERT INTO empresas (nombre) VALUES (?)', [nombre], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    // Devuelve el ID de la empresa recién creada
    res.status(201).json({ id: this.lastID, nombre });
  });
});

// Actualizar una empresa por ID
router.put('/empresas/:id', (req, res) => {
  const { nombre } = req.body;
  const id = req.params.id;
  if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

  // Actualiza el nombre de la empresa
  db.run('UPDATE empresas SET nombre = ? WHERE id = ?', [nombre, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Empresa actualizada' });
  });
});

// Eliminar una empresa por ID
router.delete('/empresas/:id', (req, res) => {
  const id = req.params.id;
  // Elimina la empresa de la base de datos
  db.run('DELETE FROM empresas WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Empresa eliminada' });
  });
});

/**
 * ============================
 * RUTAS PARA EL RECURSO RUTAS
 * ============================
 */

// Obtener todas las rutas con el nombre de su empresa asociada
router.get('/rutas', (req, res) => {
  db.all(`
    SELECT rutas.id, origen, destino, empresa_id, empresas.nombre as empresa 
    FROM rutas 
    JOIN empresas ON rutas.empresa_id = empresas.id
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows); // Devuelve las rutas con datos de la empresa
  });
});

// Crear una nueva ruta
router.post('/rutas', (req, res) => {
  const { origen, destino, empresa_id } = req.body;
  if (!origen || !destino || !empresa_id) {
    return res.status(400).json({ error: 'Faltan datos para crear la ruta' });
  }

  // Inserta una nueva ruta en la base de datos
  db.run(
    'INSERT INTO rutas (origen, destino, empresa_id) VALUES (?, ?, ?)', 
    [origen, destino, empresa_id], 
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, origen, destino, empresa_id });
  });
});

// Actualizar una ruta por ID
router.put('/rutas/:id', (req, res) => {
  const { origen, destino, empresa_id } = req.body;
  const id = req.params.id;
  if (!origen || !destino || !empresa_id) {
    return res.status(400).json({ error: 'Faltan datos para actualizar la ruta' });
  }

  // Actualiza los datos de una ruta
  db.run(
    'UPDATE rutas SET origen = ?, destino = ?, empresa_id = ? WHERE id = ?',
    [origen, destino, empresa_id, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Ruta actualizada' });
    }
  );
});

// Eliminar una ruta por ID
router.delete('/rutas/:id', (req, res) => {
  const id = req.params.id;

  // Elimina la ruta de la base de datos
  db.run('DELETE FROM rutas WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Ruta eliminada' });
  });
});

// Obtener todas las rutas asociadas a una empresa específica por su ID
router.get('/rutas/empresa/:id', (req, res) => {
  const empresaId = req.params.id;
  db.all(`
    SELECT rutas.id, origen, destino, empresa_id, empresas.nombre as empresa 
    FROM rutas 
    JOIN empresas ON rutas.empresa_id = empresas.id
    WHERE empresa_id = ?
  `, [empresaId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * ============
 * RUTA DE PRUEBA
 * ============
 */

// Endpoint básico de prueba para verificar si el servidor responde
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Exporta el enrutador para ser usado en la aplicación principal
module.exports = router;
