
// Mostrar el nombre de usuario en la barra de navegación
function cargarNombreUsuario() {
  const nombre_usuario = localStorage.getItem("nombre_usuario")?.trim(); // Obtener el nombre de usuario del localStorage
  const nav_nombre_usuario = document.getElementById("nav_nombre_usuario"); // Obtener el elemento de la barra de navegación

  if (nombre_usuario && nav_nombre_usuario) {
    nav_nombre_usuario.textContent = nombre_usuario; // Mostrar el nombre de usuario
    nav_nombre_usuario.classList.add("text-white", "font-bold"); // Añadir clases para el estilo
  }
}

// Llamar a la función cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", cargarNombreUsuario);
