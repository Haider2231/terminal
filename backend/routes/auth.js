// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'ADMIN';
const SALT_ROUNDS = 10;

// Validaciones comunes
const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('nombre').optional().trim().escape()
];

// Registro
router.post('/register', validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, nombre, empresa_id } = req.body;
  
  try {
    // Verificar si el email ya existe
    const userExists = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM usuarios WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        resolve(!!row);
      });
    });

    if (userExists) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }

    // Verificar si la empresa existe (si se proporciona empresa_id)
    if (empresa_id) {
      const empresaExists = await new Promise((resolve, reject) => {
        db.get('SELECT id FROM empresas WHERE id = ?', [empresa_id], (err, row) => {
          if (err) reject(err);
          resolve(!!row);
        });
      });

      if (!empresaExists) {
        return res.status(400).json({ error: 'Empresa no encontrada' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    db.run(
      'INSERT INTO usuarios (email, password_hash, nombre, empresa_id) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, nombre, empresa_id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Error al crear el usuario' });
        }
        
        const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ 
          token, 
          user: { 
            id: this.lastID, 
            email, 
            nombre,
            empresa_id 
          } 
        });
      }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  try {
    db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Error en login:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      
      try {
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const token = jwt.sign({ 
          id: user.id, 
          email: user.email 
        }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ 
          token, 
          user: {
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            empresa_id: user.empresa_id
          }
        });
      } catch (error) {
        console.error('Error comparando contraseñas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;