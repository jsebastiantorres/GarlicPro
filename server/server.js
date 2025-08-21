

const express = require('express');
const path = require('path');
// const db = require('./db');
const bcryptjs = require('bcryptjs'); // Para comparar contraseñas 

// desestructuración de objetos para importar funciones específicas desde db_qa
const {
    buscarPorNombreLogin, actualizarUltimoAcceso, obtenerInventarioPorClase, obtenerIdMarca,
    obtenerIdClase, obtenerIdDestino, registrarIngresoLote, obtenerMarcaPorLote, registrarSalida, obtenerIngresos, obtenerDetallesTarjeta, obtenerUsuarios, obtenerCantidadPorClase } = require('../db/db_qa');
const app = express();
const PORT = process.env.PORT || 3000;


// CORS (solicitudes entre dominios)
// Permitir solicitudes desde el frontend (localhost:5500)a nuestro servidor (servidor localhost:3000)
const cors = require('cors');
const connectToDatabase = require('../db/db_qa');
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
// Endpoint para validar el login
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


// Endpoint para generar la data del dashbard
app.get('/api/dashbard', async (req, res) => {
    try {
        const inventarioPorClase = await obtenerInventarioPorClase();

        if (!inventarioPorClase || Object.keys(inventarioPorClase).length === 0) {
            return res.json({ success: false, message: "No hay registros de clases" });
        }

        console.log("Inventario por clase:", inventarioPorClase); // Depuración

        res.json({
            success: true,
            data: inventarioPorClase
        });

    } catch (error) {
        console.error("Error al obtener el inventario por clase:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});



// Endpoint para registrar ingresos de lotes
app.post('/api/ingresos', async (req, res) => {
    try {
        console.log('se recibió una solicitud de registro de ingreso: ' + JSON.stringify(req.body));

        const { lote_codigo, marca_id, clase_id, cantidad, usuario_id } = req.body;
        if (!lote_codigo || !marca_id || !clase_id || cantidad <= 0 || !usuario_id) {
            console.log("Datos inválidos:", req.body);

            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios y la cantidad debe ser mayor a 0.'
            });// Error de validación
        }

        const resultado = await registrarIngresoLote(lote_codigo, marca_id, clase_id, cantidad, usuario_id);

        if (resultado) {
            res.json({
                success: true,
                message: 'Ingreso registrado exitosamente',
                data: resultado
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error al registrar el ingreso'
            });
        }

    } catch (error) {
        console.error("Error al registrar el ingreso:", error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});


// Endpoint para obtener la marca de un lote
app.get('/api/marca-lote/:lote_codigo', async (req, res) => {
    try {
        const { lote_codigo } = req.params;

        const marca = await obtenerMarcaPorLote(lote_codigo);

        if (marca) {
            res.json({ success: true, marca_id: marca.id, nombre_marca: marca.nombre });
        } else {
            res.json({ success: false, message: "Marca no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener la marca del lote:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});



// Enpoint para registrar salida de unidades
app.post('/api/salidas', async (req, res) => {
    try {
        console.log("Datos recibidos en el servidor:", req.body); // para depurar

        const { vale, nombreDestino, lote_codigo, nombreMarca, nombreClase, cantidad, usuario_id } = req.body;

        // 📌 Validar que todos los datos existen
        if (!vale || !nombreDestino || !lote_codigo || !nombreMarca || !nombreClase || cantidad <= 0 || !usuario_id) {
            console.error("Datos inválidos en server:", req.body);
            return res.status(400).json({ success: false, message: "Datos inválidos en server" });
        }

        // 🔍 Agregar depuración antes de llamar `registrarSalida()`
        console.log("Datos validados para registrar salida:", {
            vale, nombreDestino, lote_codigo, nombreMarca, nombreClase, cantidad, usuario_id
        });


        const resultado = await registrarSalida(vale, nombreDestino, lote_codigo, nombreMarca, nombreClase, cantidad, usuario_id);
        // const resultado = await registrarSalida(vale, destino, lote_codigo, marca, clase, cantidad, usuario_id);

        if (resultado) {
            res.json({ success: true, message: "Salida registrada con éxito" });
        } else {
            console.log("Error en la base de datos al registrar la salida");
            res.json({
                success: false,
                message: "Error al registrar la salida"
            });
        }

    } catch (error) {
        console.error("Error en el registro de salida: ", error.stack);
        res.status(500).json({ success: false, message: error.message });
    }
});



// Enpoint para tabla ingresos
app.get('/api/tablaIngresos', async (req, res) => {
    try {
        const resultados = await obtenerIngresos();
        res.json(resultados);
    } catch (error) {
        console.error("Error en la tabla de ingresos: ", error.stack);
        res.status(500).json({ success: false, message: error.message });
    }
});



// // Enpoint para dashboard tabla tarjeta activa
// app.get('/api/tablaTarjetaActiva', async (req, res) => {
//     try {
//         const resultados = await obtenerDetallesTarjeta();
//         res.json(resultados);
//     } catch (error) {
//         console.error("Error en la tabla de detalles", error.stack);
//         res.status(500).json({ success: false, message: error.message })
//     }
// })



// endpoint de prueba
app.get('/api/usuarios', async (req, res) => {
    try {
        // dispara la funcion en el backend y recibe los resultados la variable resultados;
        const resultados = await obtenerUsuarios();
        // responde los resultados convertidos en JSON
        res.json(resultados);
    } catch (error) {
        console.error("Error en la obtencion de los usuarios");
        res.status(500).json({ success: false, message: error.message });
    }
})



// endpoint para cantidades por clase
app.get('/api/cantidadesPorClase', async (req, res) => {
    try {
        // dispara la funcion que obtiene las cantidades por clase
        const resultados = await obtenerCantidadPorClase();
        // responden los resultados en JSON
        res.json(resultados);
    } catch (error) {
        console.error("Error en la obtencion de las cantidades desde server");
        res.status(500).json({ success: false, message: error.message });
    }
})








// // ENDPOINT DASHBOARD //
// // Endpoint para obtener lotes de clase "Granel" (clase_id = 1)
// app.get('/api/lotes/granel', async (req, res) => {
//     try {
//         const inventario_granel = await obtenerInventarioGranel(); // Llama a la función para obtener el inventario de granel

//         // Verificar si hay lotes de granel
//         if (inventario_granel.length === 0) {
//             return res.json({
//                 success: false,
//                 message: "No hay registros de Granel"
//             });
//         }

//         res.json({
//             success: true,
//             message: 'Inventario de granel obtenido exitosamente',
//             data: inventario_granel
//         });


//     } catch (error) {
//         console.error('Error al obtener el inventario de granel:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error al obtener el inventario de granel'
//         });
//     }
// });




// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});