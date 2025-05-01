const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// Crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
    const { nombre, email, contraseña, rol_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, contraseña, rol_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, email, contraseña, rol_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// Actualizar un usuario por ID
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contraseña, rol_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE usuarios SET nombre = $1, email = $2, contraseña = $3, rol_id = $4 WHERE id = $5 RETURNING *',
            [nombre, email, contraseña, rol_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Eliminar un usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

module.exports = router;