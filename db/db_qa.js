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

// Exportar las funciones para que puedan ser utilizadas en otros módulos
module.exports = {
    buscarPorNombreLogin,
    actualizarUltimoAcceso

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










// try {
//     // Tipo de base de datos: MySQL
//     // const mysql = require("mysql2");
//     const mysql = require("mysql2/promise"); // Si usas promesas

//     // Objeto de conexión a la base de datos
//     const connection = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "123456789",
//         database: "garlicpro_qa",
//         port: 3306
//     });

//     // Conectar a la base de datos
//     connection.connect(function (err) {
//         if (err) {
//             console.error("Error de conexión con la base de datos garlicpro db_qa: " + err.stack);
//             return;
//         }
//         console.log("Conectado a la base de datos garlicpro bd_qa como ID " + connection.threadId);
//     });

//     // Exportar la conexión para usarla en otros módulos
//     module.exports = connection;
// } catch (error) {
//     console.error("Error al conectar a la base de datos garlicpro db_qa: " + error.message);
// }

