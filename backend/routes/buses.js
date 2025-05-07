const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener todos los buses
router.get('/buses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM buses');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los buses' });
    }
});

// Obtener un bus por ID
router.get('/buses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM buses WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Bus no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el bus' });
    }
});

// Obtener los buses por ruta
router.get('/buses/ruta/:rutaId', async (req, res) => {
    const { rutaId } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM buses WHERE id IN (SELECT bus_id FROM viajes WHERE ruta_id = $1)',
            [rutaId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los buses por ruta:', error);
        res.status(500).json({ error: 'Error al obtener los buses por ruta' });
    }
});

// Crear un nuevo bus
router.post('/buses', async (req, res) => {
    const { numero_bus, conductor, empresa_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO buses (numero_bus, conductor, empresa_id) VALUES ($1, $2, $3) RETURNING *',
            [numero_bus, conductor, empresa_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el bus' });
    }
});

// Actualizar un bus por ID
router.put('/buses/:id', async (req, res) => {
    const { id } = req.params;
    const { numero_bus, conductor, empresa_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE buses SET numero_bus = $1, conductor = $2, empresa_id = $3 WHERE id = $4 RETURNING *',
            [numero_bus, conductor, empresa_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Bus no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el bus' });
    }
});

// Eliminar un bus por ID
router.delete('/buses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM buses WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Bus no encontrado' });
        }
        res.json({ message: 'Bus eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el bus' });
    }
});

module.exports = router;