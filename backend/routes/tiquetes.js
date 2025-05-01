const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener todos los tickets
router.get('/tickets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tickets');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tickets' });
    }
});

// Obtener un ticket por ID
router.get('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ticket no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el ticket' });
    }
});

// Crear un nuevo ticket
router.post('/tickets', async (req, res) => {
    const { usuario_id, viaje_id, asiento } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tickets (usuario_id, viaje_id, asiento) VALUES ($1, $2, $3) RETURNING *',
            [usuario_id, viaje_id, asiento]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el ticket' });
    }
});

// Actualizar un ticket por ID
router.put('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const { usuario_id, viaje_id, asiento } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tickets SET usuario_id = $1, viaje_id = $2, asiento = $3 WHERE id = $4 RETURNING *',
            [usuario_id, viaje_id, asiento, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ticket no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el ticket' });
    }
});

// Eliminar un ticket por ID
router.delete('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tickets WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ticket no encontrado' });
        }
        res.json({ message: 'Ticket eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el ticket' });
    }
});

module.exports = router;