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
// Crear un nuevo ticket con detalles
router.post('/tickets', async (req, res) => {
    const { usuario_id, viaje_id, asiento } = req.body;

    console.log('Datos recibidos en el servidor:', { usuario_id, viaje_id, asiento }); // Depuración

    try {
        // Verificar existencia
        const usuarioResult = await pool.query('SELECT * FROM usuarios WHERE id = $1', [usuario_id]);
        if (usuarioResult.rowCount === 0) return res.status(400).json({ error: 'El usuario no existe' });

        const viajeResult = await pool.query(`
            SELECT v.*, r.origen, r.destino, r.precio, b.numero_bus, e.nombre AS empresa_nombre
            FROM viajes v
            JOIN rutas r ON v.ruta_id = r.id
            JOIN buses b ON v.bus_id = b.id
            JOIN empresas e ON b.empresa_id = e.id
            WHERE v.id = $1
        `, [viaje_id]);
        if (viajeResult.rowCount === 0) return res.status(400).json({ error: 'El viaje no existe' });

        // Verificar asiento
        const asientoResult = await pool.query(
            'SELECT id FROM tickets WHERE viaje_id = $1 AND asiento = $2',
            [viaje_id, asiento]
        );
        if (asientoResult.rowCount > 0) return res.status(400).json({ error: 'Ese asiento ya está ocupado para este viaje' });

        // Crear ticket
        const ticketInsert = await pool.query(
            `INSERT INTO tickets (usuario_id, viaje_id, asiento, fecha_compra)
             VALUES ($1, $2, $3, NOW()) RETURNING *`,
            [usuario_id, viaje_id, asiento]
        );

        const ticket = ticketInsert.rows[0];
        const usuario = usuarioResult.rows[0];
        const viaje = viajeResult.rows[0];

        const responseData = {
            id: ticket.id,
            nombre: usuario.nombre,
            origen: viaje.origen,
            destino: viaje.destino,
            salida: viaje.salida,
            llegada: viaje.llegada,
            numero_bus: viaje.numero_bus,
            empresa: viaje.empresa_nombre, // Agregar nombre de la empresa
            asiento: ticket.asiento,
            fecha: ticket.fecha_compra,
            precio: viaje.precio
        };

        res.status(201).json(responseData);
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
