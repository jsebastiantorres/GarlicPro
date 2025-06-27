
// // listado de marcas y selector de marcas
// const marcas = ["Nasa", "Surti Abarrotes BJ", "Fruyt Garlic", "PAG", "Posso", "El Rey", "Barajas", "Import chiki"];
// const selectorMarca = document.getElementById("select_marca");

// // listado de clases y selector de clases
// const clases = ["Granel", "Malla", "Kilo", "Tula"];
// const selectorClase = document.getElementById("select_clase");

// // listado de destinos y selector de destinos
// const destinos = ["Ajos Extras", "Dialsa", "De Calidad", "FV", "Hermanos Vasquez"];
// const selectorDestino = document.getElementById("select_destino");



// // Función para agregar opciones a un selector
// const agregarOpciones = (listado, selector, mensajePredeterminado) => {
//     let opcionPredeterminada = document.createElement("option");
//     opcionPredeterminada.text = mensajePredeterminado;
//     opcionPredeterminada.value = "";
//     opcionPredeterminada.disabled = true;
//     opcionPredeterminada.selected = true;
//     selector.appendChild(opcionPredeterminada);

//     listado.forEach(opcion => {
//         let nuevaOpcion = document.createElement("option");
//         nuevaOpcion.text = opcion;
//         nuevaOpcion.value = opcion;
//         selector.appendChild(nuevaOpcion);
//     });
// };

// agregarOpciones(marcas, selectorMarca, "Seleccione una marca");
// agregarOpciones(clases, selectorClase, "Seleccione una clase");
// agregarOpciones(destinos, selectorDestino, "Seleccione un destino");

// console.log("Corriendo el script de forms.js");





// // // Listar Marcas
// // // array de marcas
// // const marcas = ["Nasa", "Surti Abarrotes BJ", "Fruyt Garlic", "PAG", "Posso", "El Rey", "Barajas", "Import chiki"];
// // // selector de marcas
// // const selectorMarca = document.getElementById("select_marca");
// // // iterar sobre el array y agregar opciones al selector
// // marcas.forEach(marca => {
// //   let nuevaOpcion = document.createElement("option");
// //   nuevaOpcion.text = marca;
// //   nuevaOpcion.value = marca;
// //   selectorMarca.appendChild(nuevaOpcion);
// // });


// // // Listar Clase
// // // array de clases
// // const clases = ["Granel", "Malla", "Kilo", "Tula"];
// // // selector de clases
// // const selectorClase = document.getElementById("select_clase");
// // // iterar sobre el array y agregar opciones al selector
// // clases.forEach(clase => {
// //   let nuevaOpcion = document.createElement("option");
// //   nuevaOpcion.text = clase;
// //   nuevaOpcion.value = clase;
// //   selectorClase.appendChild(nuevaOpcion);
// // });


// // // Listar Destino
// // // array de destinos
// // const destinos = ["Ajos Extras", "Dialsa", "De Calidad", "FV", "Hermanos Vasquez"];
// // // selector de destinos
// // const selectorDestino = document.getElementById("select_destino");
// // // iterar sobre el array y agregar opciones al selector
// // destinos.forEach(destino => {
// //   let nuevaOpcion = document.createElement("option");
// //   nuevaOpcion.text = destino;
// //   nuevaOpcion.value = destino;
// //   selectorDestino.appendChild(nuevaOpcion);
// // });


