
function togglePassword() {
    const passwordField = document.getElementById("passwordField");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}


// Credenciales de inicio de sesión temporales
const usuario = "jstorresa";
const password = "12345678";


document.addEventListener('DOMContentLoaded', () => {
});

const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('mensaje');

// Capturar los datos del formulario, sin recargar la página
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    const loginButton = document.getElementById("loginButton");

    console.log("Usuario: " + user);
    console.log("Contraseña: " + pass);


    try {
        if (pass == password && user == usuario) {
            messageDiv.textContent = "Bienvenido " + user ;
            messageDiv.className = "bg-green-100 border border-green-400 text-green-700 rounded";

            // Redireccionar a la página de bienvenida después de un login exitoso
            setTimeout(() => {
                window.location.href = '../index.html';
                document.getElementById("loginForm").reset(); // Limpiar el formulario después de un login exitoso
            }, 1000);
            console.log("acceso concedido");
        } else {
            messageDiv.innerHTML = "Error: Credenciales incorrectas.<br>Por favor, inténtalo de nuevo.";
            messageDiv.className = "bg-red-100 border border-red-400 text-red-700 rounded ";
            console.log("acceso denegado");

            document.getElementById("loginForm").reset(); // Limpiar el formulario después de un intento fallido
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'Error de conexión con el servidor';
        messageDiv.className = "bg-red-100 border border-red-400 text-red-700 rounded";
    }

});


// Enviar la peticion al servidor 

// try {
//     const response = await fetch('/api/login', {

//     });    
// } catch (error) {
    
// }

    // try {
    //     // Enviar petición al servidor
    //     const response = await fetch('/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ user, pass })
    //     });

    //     const data = await response.json();

    //     // Manejar respuesta
    //     if (response.ok) {
    //         messageDiv.textContent = data.message;
    //         messageDiv.className = 'success';

    //         // Redireccionar a la página de bienvenida después de un login exitoso
    //         setTimeout(() => {
    //             window.location.href = './index.html';
    //         }, 1500);
    //     } else {
    //         messageDiv.textContent = data.message;
    //         messageDiv.className = 'error';
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    //     messageDiv.textContent = 'Error de conexión con el servidor';
    //     messageDiv.className = 'error';
    // }



console.log("Corriendo el script de login.js");
