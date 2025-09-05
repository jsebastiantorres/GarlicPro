const mysql = require("mysql2/promise");

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "123456789",
            database: "garlicpro_qa",
            port: 3306
        });

        console.log("Se establecio conexión a la base de datos garlicpro bd_qa como ID " + connection.threadId);
        return connection; // Retorna la conexión para hacer consultas

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        throw error; // Lanza el error para que pueda ser manejado en el nivel supervisor
    }
}

// Llamar a la función para probar la conexión
connectToDatabase();

// Exportar la función de conexión
module.exports = connectToDatabase;


// BUSCAR USUARIO - Función para buscar un usuario por nombre de usuario
async function buscarPorNombreLogin(username) {
    const connection = await connectToDatabase(); // Llama a la función de conexión para obtener la conexión
    try {
        const [rows] = await connection.execute(`SELECT l.id, l.username_alias, l.estado, l.hash_password, l.ultimo_acceso, u.nombre, u.apellido
            FROM login l
            LEFT JOIN usuarios u ON l.usuario_id = u.id
            WHERE l.username_alias = ? AND l.estado = 1`,
            [username]
        );
        return rows; // Retorna los resultados de la consulta

    } catch (error) {
        console.error("Error al buscar el usuario:" + username, error.message);
        throw error; // Lanza el error para que pueda ser manejado en el nivel supervisor
    } finally {
        await connection.end(); // Cierra la conexión después de la consulta
    }
}


// ACTUALIZAR EL ULTIMO ACCESO - Función para actualizar el último acceso de un usuario
async function actualizarUltimoAcceso(login_id) {
    const connection = await connectToDatabase(); // Llama a la función de conexión para obtener la conexión

    try {
        await connection.execute(`UPDATE login SET ultimo_acceso = NOW() WHERE id = ?`, [login_id]);
        console.log("Ultimo acceso actualizado para el usuario con ID:", login_id);
    } catch (error) {
        console.error("Error al actualizar el último acceso:", error.message);
    } finally {
        if (connection) connection.end(); // Cierra la conexión después de la consulta
    }
}



// OBTENER INVENTARIO - Función para obtener el inventario agrupado por clase
async function obtenerInventarioPorClase() {
    const connection = await connectToDatabase();
    try {
        // 🟢 Consulta para obtener los lotes junto con el nombre de la clase y la marca
        const [lotes] = await connection.execute(`
            SELECT lotes.lote_codigo, lotes.marca_id, clases.id AS clase_id, clases.nombre AS clase, lotes.cantidad  
            FROM lotes
            JOIN clases ON lotes.clase_id = clases.id
        `);
        console.log("Consulta SQL - Lotes agrupados por clase:", lotes);

        // 🟢 Consulta para obtener la cantidad total por cada clase
        const [totalCantidad] = await connection.execute(`
            SELECT clases.id AS clase_id, clases.nombre AS clase, SUM(lotes.cantidad) AS total 
            FROM lotes
            JOIN clases ON lotes.clase_id = clases.id
            GROUP BY clases.id
        `);
        console.log("Consulta SQL - Total cantidad por clase:", totalCantidad);

        // 🟢 Consulta para obtener los nombres de las marcas
        const [marcas] = await connection.execute(`
            SELECT id AS marca_id, nombre AS nombre_marca FROM marcas
        `);
        console.log("Consulta SQL - Marcas:", marcas);

        // 🔹 Mapear los nombres de las marcas y la cantidad total por clase
        const marcasMap = new Map(marcas.map(marca => [marca.marca_id, marca.nombre_marca]));
        const totalMap = new Map(totalCantidad.map(t => [t.clase_id, { nombre: t.clase, total: t.total }]));

        // 🔹 Agrupar lotes por clase
        const clasesAgrupadas = {};
        lotes.forEach(lote => {
            const nombreClase = lote.clase;
            if (!clasesAgrupadas[nombreClase]) {
                clasesAgrupadas[nombreClase] = {
                    total_cantidad: totalMap.get(lote.clase_id)?.total || 0,
                    lotes: []
                };
            }
            clasesAgrupadas[nombreClase].lotes.push({
                lote_codigo: lote.lote_codigo,
                marca: marcasMap.get(lote.marca_id) || "Desconocido",
                cantidad: lote.cantidad
            });
        });

        console.log("Clases agrupadas:", clasesAgrupadas); // Depuración
        return clasesAgrupadas; // Retornar los datos listos para el frontend

    } catch (error) {
        console.error("Error en consultas múltiples:", error.message);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}


// OBTENER ID DE MARCA - Función para obtener el ID de una marca por su nombre
async function obtenerIdMarca(nombreMarca) {
    const connection = await connectToDatabase(); // Llama a la función de conexión para obtener la conexión
    try {
        const [rows] = await connection.execute(`SELECT id FROM marcas WHERE nombre = ?`, [nombreMarca]);
        if (rows.length > 0) {
            return rows[0].id; // Retorna el ID de la marca
        } else {
            throw new Error("Marca no encontrada");
        }
    } catch (error) {
        console.error("Error al obtener el ID de la marca:", error.message);
        throw error; // Lanza el error para que pueda ser manejado en el nivel supervisor
    } finally {
        if (connection) connection.end(); // Cierra la conexión después de la consulta
    }
}


// OBTENER ID DE CLASE - Función para obtener el ID de una clase por su nombre
async function obtenerIdClase(nombreClase) {
    const connection = await connectToDatabase(); // Llama a la función de conexión para obtener la conexión
    try {
        const [rows] = await connection.execute(`SELECT id FROM clases WHERE nombre = ?`, [nombreClase]);
        if (rows.length > 0) {
            return rows[0].id; // Retorna el ID de la clase
        } else {
            throw new Error("Clase no encontrada");
        }
    } catch (error) {
        console.error("Error al obtener el ID de la clase:", error.message);
        throw error; // Lanza el error para que pueda ser manejado en el nivel supervisor
    }
    finally {
        if (connection) connection.end(); // Cierra la conexión después de la consulta
    }
}


// OBTENER ID DE DESTINO - Función para obtener el ID de un destino por su nombre
async function obtenerIdDestino(nombreDestino) {
    const connection = await connectToDatabase();
    try {
        console.log("Buscando destino:", nombreDestino); // 🔍 Depuración

        const [rows] = await connection.execute(`
            SELECT id FROM destinos WHERE nombre = ?
        `, [nombreDestino]);

        console.log("Resultado de consulta:", rows); // ✅ Ver datos obtenidos

        return rows.length > 0 ? rows[0].id : null;
    } catch (error) {
        console.error("Error al obtener ID de destino:", error.message);
        return null;
    } finally {
        if (connection) await connection.end();
    }
}




// REGISTRAR INGRESO DE LOTE - Función para registrar el ingreso de un lote
async function registrarIngresoLote(lote_codigo, nombreMarca, nombreClase, cantidad, login_id) {
    const connection = await connectToDatabase(); // Llama a la función de conexión para obtener la conexión
    try {
        // Obtener el ID de la marca y la clase
        const marca_id = await obtenerIdMarca(nombreMarca); // Obtener el ID de la marca
        const clase_id = await obtenerIdClase(nombreClase); // Obtener el ID de la clase

        const producto_id = 1; // por defecto 1 ya que es el unico producto que se maneja por ahora

        // Insertar el nuevo lote en la base de datos
        const resultado = await connection.execute(`INSERT INTO ingresos (lote_codigo, marca_id, clase_id, producto_id, cantidad, login_id) VALUES (?, ?, ?, ?, ?, ?)`,
            [lote_codigo, marca_id, clase_id, producto_id, cantidad, login_id]
        );

        console.log("Ingreso registrado exitosamente:", { lote_codigo, marca_id, clase_id, producto_id, cantidad, login_id });
        return resultado; // Retorna el resultado de la inserción
    } catch (error) {
        console.error("Error al registrar el ingreso del lote:", error.message);
        throw error; // Lanza el error para que pueda ser manejado en el nivel supervisor
    } finally {
        if (connection) connection.end(); // Cierra la conexión después de la consulta
    }
}

// REGISTRAR SALIDA - funcion para obtener la marca de un lote
async function obtenerMarcaPorLote(lote_codigo) {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute(`
            SELECT marcas.id, marcas.nombre
            FROM lotes
            JOIN marcas ON lotes.marca_id = marcas.id
            WHERE lotes.lote_codigo = ?
        `, [lote_codigo]);

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error al obtener marca por lote:", error.message);
        return null;
    } finally {
        if (connection) await connection.end();
    }
}


// REGISTRAR SALIDA - funcion para regisrar salida de unidades
async function registrarSalida(vale, nombreDestino, lote_codigo, nombreMarca, nombreClase, cantidad, usuario_id) {
    const connection = await connectToDatabase();

    try {
        const marca_id = await obtenerIdMarca(nombreMarca);
        const clase_id = await obtenerIdClase(nombreClase);
        const destino_id = await obtenerIdDestino(nombreDestino);

        console.log("ID Marca:", marca_id, "ID Clase:", clase_id, "ID Destino:", destino_id, "Cantidad:", cantidad);

        // Verificar IDs
        if (!marca_id || !clase_id || !destino_id) {
            console.error("Error: Marca, clase o destino no encontrados.");
            throw new Error("Marca, clase o destino no encontrados.");

        }

        // Verificar disponibilidad del inventario
        const [inventario] = await connection.execute(`
            SELECT cantidad FROM lotes WHERE lote_codigo = ? AND clase_id = ?
        `, [lote_codigo, clase_id]);

        if (!inventario || inventario.length === 0 || inventario[0].cantidad < cantidad) {
            console.error("Error: Inventario insuficiente.");
            throw new Error("Inventario insuficiente para procesar la salida.");
        }

        // No ejecutar la actualizacion si la cantidad de salida es mayor que la disponible
        // if (inventario[0].cantidad >= cantidad) {
        //     await connection.execute(`
        //         UPDATE lotes SET cantidad = cantidad - ? WHERE lote_codigo = ? AND clase_id = ?`,
        //         [cantidad, lote_codigo, clase_id]);
        // }


        // SENTENCIAS EN BASE DE DATOS
        // 🟢 Insertar salida en la base de datos

        const resultado = await connection.execute(`
            INSERT INTO salidas (lote_codigo, marca_id, clase_id, vale, destino_id, cantidad, login_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [lote_codigo, marca_id, clase_id, vale, destino_id, cantidad, usuario_id]);

        console.log("✅ Salida registrada correctamente:", resultado);

        // const resultado = await connection.execute(`
        //     INSERT INTO salidas (vale, lote_codigo, marca_id, clase_id, destino_id, cantidad, fecha_salida, login_id)
        //     VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?)
        // `, [vale, lote_codigo, marca_id, clase_id, destino_id, cantidad, usuario_id]);

        // 🟢 Actualizar inventario en lotes
        // await connection.execute(`
        //     UPDATE lotes SET cantidad = cantidad - ? WHERE lote_codigo = ? AND clase_id = ?
        // `, [cantidad, lote_codigo, clase_id]);

        console.log("Salida registrada:", resultado);
        return resultado;
    } catch (error) {
        console.error("Error al registrar salida:", error);
        return { success: false, message: error.message }; // ✅ Enviar un mensaje
    } finally {
        if (connection) await connection.end();
    }
}



// Ingresos - tabla de ingresos
async function obtenerIngresos() {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute('SELECT i.lote_codigo, m.nombre AS marca, c.nombre AS clase, i.cantidad, i.fecha_ingreso FROM ingresos i JOIN marcas m ON i.marca_id = m.id JOIN clases c ON i.clase_id = c.id ORDER BY fecha_ingreso DESC');
        return rows;

    } catch (error) {
        console.error("Error al obtener los ingresos:", error);
        return []; // Evita el error en el frontend
    } finally {
        if (connection) await connection.end();
    }
}


// Dashboard - tabla usuarios prueba
async function obtenerUsuarios() {
    // conecta a la base de datos
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute(`SELECT * FROM usuarios`)
        return rows;
    } catch (error) {
        // en caso de error
        console.error("Error al obtener los usuarios desde BD", error);
        return [];
    } finally {
        //cierra la conexion a DB
        if (connection) await connection.end();
    }
}


// Dashboard - obtener cantidad total de cada clases
async function obtenerCantidadPorClase() {
    // conectar base de datos
    const connection = await connectToDatabase();

    // resultados al ejecutar la consulta
    try {
        const [rows] = await connection.execute(
            `SELECT lotes.clase_id, clases.nombre, SUM(cantidad) AS sumaXclase 
            FROM lotes 
            JOIN clases ON lotes.clase_id = clases.id 
            GROUP BY lotes.clase_id, clases.nombre
            ORDER BY clase_id;`)
        return rows
    } catch (error) {
        console.error("Error al obtener las cantidades de las clases desde BD", error);
        return [];
    } finally {
        // cierra la conexion a DB
        if (connection) await connection.end();
    }
}


// Dashboard - obtener detalles de la clase 
async function obtenerDetallesClase(nombreClase) {
    // conectar base de datos
    const connection = await connectToDatabase();

    // resultados al ejecutar la consulta
    try {
        const [rows] = await connection.execute(`
            SELECT lote_codigo, clases.nombre AS clase_nombre, marca_id, marcas.nombre AS marca_nombre, cantidad
            FROM lotes
            JOIN marcas ON lotes.marca_id = marcas.id
            JOIN clases ON lotes.clase_id = clases.id
            WHERE clases.nombre = ? AND cantidad <> 0 AND cantidad IS NOT NULL
            ORDER BY cantidad DESC;`, [nombreClase])
        // retornamos los resultados
        return rows;
    } catch (error) {
        console.error("Error al obtener los detalles de la clase desde DB", error);
        throw error;
    } finally {
        // cerramos la conexion a DB
        if (connection) await connection.end();
    }
}


// Obtener los movimientos por Clase
async function obtenerMovimientosClase(nombreClase) {
    // conectar base de datos
    const connection = await connectToDatabase();

    // resultados al ejecutar la consulta
    try {
        const [rows] = await connection.execute(`
            SELECT movimientos.id, fecha, lote_codigo, id_tipo_movimiento, tipo_movimientos.nombre AS tipo_movimiento, marca_id, marcas.nombre AS marca, clase_id, clases.nombre AS clase, login_id, login.username_alias AS login, cantidad FROM movimientos
            JOIN tipo_movimientos ON tipo_movimientos.id = id_tipo_movimiento
            JOIN marcas ON marcas.id = marca_id
            JOIN clases ON clases.id = clase_id
            JOIN login ON login.id = login_id
            WHERE clases.nombre = ?
            ORDER BY fecha DESC;
            `, [nombreClase])

        console.log("Se envian los datos", rows);

        // retornamos los resultados
        return rows
    } catch (error) {
        console.error("Error al obtener los movimientos de la clase desde DB", error);
        throw error;
    } finally {
        // cerrar la conexion a DB
        if (connection) await connection.end()
    }
}


// Obtener los movimientos de los ultimos 7 dias registrados para la clase
async function obtenerMovimientosUltimosSieteDias(nombreClase) {
    // Conectamos la base de datos
    const connection = await connectToDatabase();
    // Ejecutamos la consulta para traer los movimientos de los ultimos 7 dias registrados para la clase
    try {
        const [rows] = await connection.execute(`
            SELECT  m.id, m.fecha, m.id_tipo_movimiento, tipo_movimientos.nombre AS movimiento, m.cantidad, clases.nombre AS clase
                FROM movimientos m
                JOIN clases ON clases.id = clase_id
                JOIN tipo_movimientos ON tipo_movimientos.id = id_tipo_movimiento
                JOIN (
                    SELECT DISTINCT DATE(fecha) AS fecha
                    FROM movimientos
                    WHERE clase_id = (
                        SELECT id FROM clases WHERE nombre = ? LIMIT 1
                    )
                    ORDER BY fecha DESC
                    LIMIT 7
                ) ultimos ON DATE(m.fecha) = ultimos.fecha
                WHERE clases.nombre = ?

                ORDER BY m.fecha DESC;
            `, [nombreClase, nombreClase])

        console.log("Se envianlos datos desde DB", rows);

        // retornamos los resultados
        return rows

    } catch (error) {
        console.error("Error al obtener los movimientos de los ultimos 7 dias registrados", error);
        throw error;
    } finally {
        // cerrar la conexion a DB
        if (connection) await connection.end();
    }
}




// Dashboard - tabla detalles tarjeta
// async function obtenerDetallesTarjeta() {
//     const connection = await connectToDatabase();
//     try {
//         // consiltar para obtener los lotes junto con el nombre de la clase y marca
//         const [lotes] = await connection.execute(`SELECT lotes.lote_codigo, lotes.marca_id, marcas.nombre AS marca, clases.id AS clase_id, clases.nombre AS clase, lotes.cantidad FROM lotes JOIN clases ON lotes.clase_id = clases.id JOIN marcas ON lotes.marca_id = marcas.id`);
//         console.log("Consulta SQL - Detalles de las clases: Lote, Marca, Cantidad");
//         console.log(lotes);

//         return lotes;

//     } catch (error) {
//         console.error("Error en la consulta para obtener detalles de las tarjetas", error.message);
//         throw error;
//     } finally {
//         if (connection) await connection.end();
//     }
// }






// Este codigo se puede mejorar a futuro creando un for por cada clase o producto 
// OBTENER INVENTARIO - DASHBOARD
// async function obtenerInventarioGranel() {
//     const connection = await connectToDatabase(); // Llama a la función de conexión para obtener la conexión
//     try {

//         // Consulta para obtener el inventario de granel
//         const [rows] = await connection.execute(`
//             SELECT lote_codigo, marca_id, clase_id, cantidad 
//             FROM lotes WHERE clase_id = 1
//             `); // Consulta para obtener el inventario de granel
//         console.log("Consulta SQL - Granel:", rows)

//         // Consulta para obtener el total de cantidad de granel
//         const [totalCantidad] = await connection.execute(`
//             SELECT clase_id, SUM(cantidad) AS total 
//             FROM lotes WHERE clase_id = 1
//             GROUP BY clase_id
//         `);
//         console.log("Consulta SQL - Granel Total:", totalCantidad)

//         // Consulta para obtener los nombres de las marcas
//         const [marcas] = await connection.execute(`
//             SELECT id AS marca_id, nombre AS nombre_marca FROM marcas
//         `);
//         console.log("Consulta SQL - Marcas:", marcas);


//         // unir los resultados y mapear los nombres de las marcas
//         const marcasMap = new Map(marcas.map(marca => [marca.marca_id, marca.nombre_marca]));
//         const totalMap = new Map(totalCantidad.map(t => [t.clase_id, t.total]));

//         const lotesConMarca = rows.map(lote => ({
//             lote_codigo: lote.lote_codigo,
//             marca: marcasMap.get(lote.marca_id) || "Desconocido", // 🔹 Ahora usa correctamente `marcas`
//             cantidad: lote.cantidad,
//             total_cantidad: totalMap.get(lote.clase_id) || 0
//         }));
//         console.log("Consulta SQL - Granel con marcas:", lotesConMarca);


//         return lotesConMarca; // Retorna los resultados de la consulta
//     } catch (error) {
//         console.error("Error al obtener el inventario de granel:", error.message);
//         throw error; // Lanza el error para que pueda ser manejado en el nivel supervisor
//     } finally {
//         if (connection) connection.end(); // Cierra la conexión después de la consulta
//     }
// }




// Exportar las funciones para que puedan ser utilizadas en otros módulos
module.exports = {
    buscarPorNombreLogin,
    actualizarUltimoAcceso,
    // obtenerInventarioGranel,
    obtenerInventarioPorClase,
    obtenerIdMarca,
    obtenerIdClase,
    obtenerIdDestino,
    registrarIngresoLote,
    obtenerMarcaPorLote,
    registrarSalida,
    obtenerIngresos,
    // obtenerDetallesTarjeta,
    obtenerUsuarios,
    obtenerCantidadPorClase,
    obtenerDetallesClase,
    obtenerMovimientosClase,
    obtenerMovimientosUltimosSieteDias
}













// La funcion de ACTUALIZAR LA CONTRASEÑA DE UN USUARIO estará disponible para los perfiles de ADMINISTRADOR y SUPERADMINISTRADOR proximamente
// // Actualizar la contraseña de un usuario
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const usernameReset = "lnvasqueza"; // Nombre de usuario para el cual se actualizará la contraseña
// const passwordReset = "789"; // Nueva contraseña

// bcrypt.hash(passwordReset, saltRounds, async (err, hash) => {
//     const connection = await connectToDatabase(); // Llama a la función de conexión para obtener la conexión
//     if (err) throw err;

//     const query = "UPDATE login SET hash_password = ? WHERE username_alias = ?"; // Consulta para actualizar la contraseña
//     await connection.execute(query, [hash, usernameReset]); // Ejecuta la consulta para actualizar la contraseña 

//     console.log("Contraseña actualizada correctamente en MySQL");
// });


// '1', 'fetorresa', '$2b$10$y4A6ZItG4FB0YRQFaLAMzukTRZIWLdwlTfKc1S9KatzI/xqJ07Tqi', '1', '2025-05-09 16:56:03', '1'




// REALIZAR INGRESO DE PRODUCTO-LOTE

async function IngresoProducto(lote, marca, clase, cantidad) {
    const connection = await connectToDatabase(); // Llama a la función de conexión para obtener la conexión

    try {
        await connection.execute(`UPDATE login SET ultimo_acceso = NOW() WHERE id = ?`, [login_id]);
        console.log("Ultimo acceso actualizado para el usuario con ID:", login_id);
    } catch (error) {
        console.error("Error al actualizar el último acceso:", error.message);
    } finally {
        if (connection) connection.end(); // Cierra la conexión después de la consulta
    }
}
