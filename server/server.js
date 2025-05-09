

const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de bienvenida
app.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

// Ruta para el API de login
app.post('/api/login', (req, res) => {
    const { user, pass } = req.body;

    // Validación básica
    if (!user || !pass) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    // Consulta SQL para verificar credenciales
    const query = 'SELECT * FROM usuarios WHERE user = ? AND pass = ?';

    db.query(query, [user, pass], (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({ message: 'Error del servidor' });
        }

        // Verificar si las credenciales son correctas
        if (results.length > 0) {
            return res.status(200).json({
                message: 'Login exitoso',
                user: { id: results[0].id, user: results[0].user }
            });
        } else {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});