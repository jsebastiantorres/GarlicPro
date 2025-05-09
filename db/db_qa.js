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
    }
}

// Llamar a la función para probar la conexión
connectToDatabase();

// Exportar la función de conexión
module.exports = connectToDatabase;




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

