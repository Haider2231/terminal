const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener todos los municipios
router.get('/municipios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM municipios');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los municipios' });
    }
});

// Obtener un municipio por ID
router.get('/municipios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM municipios WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Municipio no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el municipio' });
    }
});

// Crear un nuevo municipio
router.post('/municipios', async (req, res) => {
    const { nombre } = req.body;
    try {
        const result = await pool.query('INSERT INTO municipios (nombre) VALUES ($1) RETURNING *', [nombre]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el municipio' });
    }
});

// Actualizar un municipio por ID
router.put('/municipios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const result = await pool.query('UPDATE municipios SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Municipio no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el municipio' });
    }
});

// Eliminar un municipio por ID
router.delete('/municipios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM municipios WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Municipio no encontrado' });
        }
        res.json({ message: 'Municipio eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el municipio' });
    }
});

module.exports = router;