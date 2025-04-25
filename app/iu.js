

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


// Listar Marcas
// array de marcas
const marcas = ["Nasa", "Surti Abarrotes BJ", "Fruyt Garlic", "PAG", "Posso", "El Rey", "Barajas", "Import chiki"];
// selector de marcas
const selectorMarca = document.getElementById("select_marca");
// iterar sobre el array y agregar opciones al selector
marcas.forEach(marca => {
  let nuevaOpcion = document.createElement("option");
  nuevaOpcion.text = marca;
  nuevaOpcion.value = marca;
  selectorMarca.appendChild(nuevaOpcion);
});


// Listar Clase
// array de clases
const clases = ["Granel", "Malla", "Kilo", "Tula"];
// selector de clases
const selectorClase = document.getElementById("select_clase");
// iterar sobre el array y agregar opciones al selector
clases.forEach(clase => {
  let nuevaOpcion = document.createElement("option");
  nuevaOpcion.text = clase;
  nuevaOpcion.value = clase;
  selectorClase.appendChild(nuevaOpcion);
});


// Listar Destino
// array de destinos
const destinos = ["Ajos Extras", "Dialsa", "De Calidad", "FV", "Hermanos Vasquez"];
// selector de destinos
const selectorDestino = document.getElementById("select_destino");
// iterar sobre el array y agregar opciones al selector
destinos.forEach(destino => {
  let nuevaOpcion = document.createElement("option");
  nuevaOpcion.text = destino;
  nuevaOpcion.value = destino;
  selectorDestino.appendChild(nuevaOpcion);
});



