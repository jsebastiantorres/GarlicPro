
// Mostar el nombre de usuario en la barra de navegación
function cargarNombreUsuario() {
    // Recuperar el nombre de usuario guardado en localStorage
    const nombre_usuario = localStorage.getItem('nombre_usuario');
  
    // Si hay un nombre de usuario guardado, mostrarlo en la barra de navegación
    if (nombre_usuario) {
      if (nav_nombre_usuario) {
        const nav_nombre_usuario = document.getElementById('nav_nombre_usuario');
        nav_nombre_usuario.textContent = nombre_usuario;
        nav_nombre_usuario.className = "text-white font-bold";
        console.log("Nombre de usuario cargado: " + nombre_usuario); // Para depuración
      }
    }
  }
  
  // Llamar a la función cuando el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', cargarNombreUsuario);
  
  