
// Toggle Cerrar sesión
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

document.addEventListener('click', (event) => {
  if (!menuToggle.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.add('hidden');
  }
});





