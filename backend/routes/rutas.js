const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener todas las rutas
router.get('/rutas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rutas');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutas' });
    }
});

// Obtener una ruta por ID
router.get('/rutas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM rutas WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ruta no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la ruta' });
    }
});

// Crear una nueva ruta
router.post('/rutas', async (req, res) => {
    const { origen, destino, distancia_km, duracion_estimada, precio } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO rutas (origen, destino, distancia_km, duracion_estimada, precio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [origen, destino, distancia_km, duracion_estimada, precio]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la ruta' });
    }
});

// Actualizar una ruta por ID
router.put('/rutas/:id', async (req, res) => {
    const { id } = req.params;
    const { origen, destino, distancia_km, duracion_estimada, precio } = req.body;
    try {
        const result = await pool.query(
            'UPDATE rutas SET origen = $1, destino = $2, distancia_km = $3, duracion_estimada = $4, precio = $5 WHERE id = $6 RETURNING *',
            [origen, destino, distancia_km, duracion_estimada, precio, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ruta no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la ruta' });
    }
});

// Eliminar una ruta por ID
router.delete('/rutas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM rutas WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ruta no encontrada' });
        }
        res.json({ message: 'Ruta eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la ruta' });
    }
});

module.exports = router;