const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener todos los viajes
router.get('/viajes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM viajes');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los viajes' });
    }
});

// Obtener un viaje por ID
router.get('/viajes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM viajes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el viaje' });
    }
});

// Crear un nuevo viaje
router.post('/viajes', async (req, res) => {
    const { bus_id, ruta_id, salida, llegada } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO viajes (bus_id, ruta_id, salida, llegada) VALUES ($1, $2, $3, $4) RETURNING *',
            [bus_id, ruta_id, salida, llegada]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el viaje' });
    }
});

// Actualizar un viaje por ID
router.put('/viajes/:id', async (req, res) => {
    const { id } = req.params;
    const { bus_id, ruta_id, salida, llegada } = req.body;
    try {
        const result = await pool.query(
            'UPDATE viajes SET bus_id = $1, ruta_id = $2, salida = $3, llegada = $4 WHERE id = $5 RETURNING *',
            [bus_id, ruta_id, salida, llegada, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el viaje' });
    }
});

// Eliminar un viaje por ID
router.delete('/viajes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM viajes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.json({ message: 'Viaje eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el viaje' });
    }
});

module.exports = router;