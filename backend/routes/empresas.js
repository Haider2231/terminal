const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener todas las empresas
router.get('/empresas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM empresas');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las empresas' });
    }
});

// Obtener una empresa por ID
router.get('/empresas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM empresas WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la empresa' });
    }
});

// Crear una nueva empresa
router.post('/empresas', async (req, res) => {
    const { nombre } = req.body;
    try {
        const result = await pool.query('INSERT INTO empresas (nombre) VALUES ($1) RETURNING *', [nombre]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la empresa' });
    }
});

// Actualizar una empresa por ID
router.put('/empresas/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const result = await pool.query('UPDATE empresas SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la empresa' });
    }
});

// Eliminar una empresa por ID
router.delete('/empresas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM empresas WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.json({ message: 'Empresa eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la empresa' });
    }
});

module.exports = router;