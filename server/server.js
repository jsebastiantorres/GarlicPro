

const express = require('express');
const path = require('path');
// const db = require('./db');
const bcryptjs = require('bcryptjs'); // Para comparar contraseñas 
const { buscarPorNombreLogin, actualizarUltimoAcceso } = require('../db/db_qa');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS (solicitudes entre dominios)
// Permitir solicitudes desde el frontend (localhost:5500)a nuestro servidor (servidor localhost:3000)
const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Permite solicitudes desde el frontend
    methods: ['GET', 'POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type'] // Headers permitidos
}));

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));


// ENPOINTS //
// Endpoint para validaar el login
app.post('/api/login', async (req, res) => {
    try {
        console.log('se recibió una solicitud de inicio de sesión');
        console.log('Cuerpo de la solicitud:', req.body);

        const { username, password } = req.body;

        // Validación básica
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Usuario y contraseña son requeridos'
            });
        }

        // Buscar el usuario en la base de datos
        const user = await buscarPorNombreLogin(username);
        const foundUser = user[0]; // Obtener el primer usuario
        console.log('Usuario encontrado:', user);


        // Verificar si el usuario existe
        if (!user || user.length === 0) {
            console.log('Usuario no encontrado');
            return res.status(401).json({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // Verificar la contraseña
        // comparar la contraseña ingresada con la almacenada en la base de datos
        const isPasswordValid = await bcryptjs.compare(password, foundUser.hash_password);

        // si la contraseña no es válida, enviar un mensaje de error
        if (!isPasswordValid) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // Actualizar último acceso del username_alias utilizando el id
        const ultimo_acceso = await actualizarUltimoAcceso(foundUser.id);

        // Si las credenciales son correctas, crear un objeto sin la contraseña
        const userResponse = {
            id: foundUser.id,
            username: foundUser.username_alias,
            nombre: foundUser.nombre,
            apellido: foundUser.apellido,
            ultimo_acceso: foundUser.ultimo_acceso,
        };

        // Enviar respuesta exitosa
        res.json({
            success: true,
            message: 'Login exitoso',
            user: userResponse
        });

    } catch (error) {
        console.log('Error en el login:', error);
        return res.status(500).json({
            success: false,
            message: 'Error del servidor'
        });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});