const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Obtener todas las empresas
router.get('/empresas', (req, res) => {
  db.all('SELECT * FROM empresas', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear una nueva empresa
router.post('/empresas', (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }
  db.run('INSERT INTO empresas (nombre) VALUES (?)', [nombre], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, nombre });
  });
});

// Actualizar una empresa
router.put('/empresas/:id', (req, res) => {
  const { nombre } = req.body;
  const id = req.params.id;
  if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

  db.run('UPDATE empresas SET nombre = ? WHERE id = ?', [nombre, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Empresa actualizada' });
  });
});

// Eliminar una empresa
router.delete('/empresas/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM empresas WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Empresa eliminada' });
  });
});

// Obtener todas las rutas
router.get('/rutas', (req, res) => {
  db.all(`
    SELECT rutas.id, origen, destino, empresa_id, empresas.nombre as empresa 
    FROM rutas 
    JOIN empresas ON rutas.empresa_id = empresas.id
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear una nueva ruta
router.post('/rutas', (req, res) => {
  const { origen, destino, empresa_id } = req.body;
  if (!origen || !destino || !empresa_id) {
    return res.status(400).json({ error: 'Faltan datos para crear la ruta' });
  }
  db.run(
    'INSERT INTO rutas (origen, destino, empresa_id) VALUES (?, ?, ?)', 
    [origen, destino, empresa_id], 
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, origen, destino, empresa_id });
  });
});

// Actualizar una ruta
router.put('/rutas/:id', (req, res) => {
  const { origen, destino, empresa_id } = req.body;
  const id = req.params.id;
  if (!origen || !destino || !empresa_id) {
    return res.status(400).json({ error: 'Faltan datos para actualizar la ruta' });
  }

  db.run(
    'UPDATE rutas SET origen = ?, destino = ?, empresa_id = ? WHERE id = ?',
    [origen, destino, empresa_id, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Ruta actualizada' });
    }
  );
});

// Eliminar una ruta
router.delete('/rutas/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM rutas WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Ruta eliminada' });
  });
});

// Obtener rutas de una empresa específica
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

// Endpoint de prueba
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

module.exports = router;

