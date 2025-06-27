// Script para el inicio de sesión de GarlicPro

// Convertir el texto en minúsculas
document.getElementById('user').addEventListener('input', function () {
    this.value = this.value.toLowerCase();
});

// Script para el inicio de sesión de GarlicPro
// Este script maneja el inicio de sesión del usuario en la aplicación GarlicPro
// Se encarga de capturar los datos del formulario, enviarlos al servidor y manejar la respuesta
document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm'); // Formulario de inicio de sesión
    const messageDiv = document.getElementById('mensaje'); // Div para mostrar mensajes

    // Capturar los datos del formulario, sin recargar la página
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById("user").value; // Obtener el valor del campo de usuario
            const password = document.getElementById("pass").value; // Obtener el valor del campo de contraseña
            const loginButton = document.getElementById("loginButton"); // Botón de inicio de sesión

            // console.log("Usuario: " + username);
            // console.log("Contraseña: " + password);

            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                console.log("Raw Response:", response);
                const data = await response.json();
                console.log("Parsed JSON:", data);

                // Validar la respuesta antes de almacenar en el localStorage y mosrar en el mensaje
                if (data.success && data.user) {
                    //guardar información de usuario en localStorage
                    localStorage.setItem('usuario_id', data.user.id);
                    localStorage.setItem('username', data.user.username);
                    localStorage.setItem('nombre_usuario', data.user.nombre);
                    localStorage.setItem('apellido_usuario', data.user.apellido);
                    localStorage.setItem('ultimo_acceso', data.user.ultimo_acceso);

                    // Mostrar mensaje de éxito
                    messageDiv.textContent = "Hola " + data.user.nombre;
                    messageDiv.className = "bg-green-100 border border-green-400 text-green-700 rounded";

                    // Redireccionar al index después de un login exitoso 
                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 2000);

                    console.log("Acceso concedido");
                } else {
                    messageDiv.textContent = 'Usuario o contraseña incorrectos';
                    messageDiv.className = "bg-red-100 border border-red-400 text-red-700 rounded";
                }

            } catch (error) {
                messageDiv.textContent = 'Error de conexión con el servidor';
                messageDiv.className = "bg-red-100 border border-red-400 text-red-700 rounded";
            }
        });
    }
});


// Confirmación de que el script se está ejecutando
console.log("Corriendo el script de login.js");
