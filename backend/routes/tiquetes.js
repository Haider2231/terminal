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
        // Verificar si el usuario existe
        const usuarioResult = await pool.query('SELECT id FROM usuarios WHERE id = $1', [usuario_id]);
        if (usuarioResult.rowCount === 0) {
            return res.status(400).json({ error: 'El usuario no existe' });
        }

        // Verificar si el viaje existe
        const viajeResult = await pool.query('SELECT id FROM viajes WHERE id = $1', [viaje_id]);
        if (viajeResult.rowCount === 0) {
            return res.status(400).json({ error: 'El viaje no existe' });
        }

        // Verificar si el asiento ya está ocupado en ese viaje
        const asientoResult = await pool.query(
            'SELECT id FROM tickets WHERE viaje_id = $1 AND asiento = $2',
            [viaje_id, asiento]
        );
        if (asientoResult.rowCount > 0) {
            return res.status(400).json({ error: 'Ese asiento ya está ocupado para este viaje' });
        }

        // Insertar el ticket
        const result = await pool.query(
            'INSERT INTO tickets (usuario_id, viaje_id, asiento, fecha_compra) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [usuario_id, viaje_id, asiento]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error al crear el ticket:', error);
        res.status(500).json({ error: 'Error al crear el ticket' });
    }
});


// Actualizar un ticket por ID
router.put('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const { usuario_id, viaje_id, asiento, fecha_compra } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tickets SET usuario_id = $1, viaje_id = $2, asiento = $3, fecha_compra = $4 WHERE id = $5 RETURNING *',
            [usuario_id, viaje_id, asiento, fecha_compra, id]
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
