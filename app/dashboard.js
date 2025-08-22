// document.addEventListener("DOMContentLoaded", async () => {
//     // 📌 Obtener referencias a las tarjetas en el DOM
//     const tarjetas = {
//         "Granel": {
//             titulo: document.getElementById("titulo_card_granel"),
//             cantidad: document.getElementById("cantidad_total_granel"),
//             lista: document.getElementById("lista_lotes_granel")
//         },
//         "Malla": {
//             titulo: document.getElementById("titulo_card_malla"),
//             cantidad: document.getElementById("cantidad_total_malla"),
//             lista: document.getElementById("lista_lotes_malla")
//         },
//         "Kilo": {
//             titulo: document.getElementById("titulo_card_kilo"),
//             cantidad: document.getElementById("cantidad_total_kilo"),
//             lista: document.getElementById("lista_lotes_kilo")
//         },
//         "Tula": {
//             titulo: document.getElementById("titulo_card_tula"),
//             cantidad: document.getElementById("cantidad_total_tula"),
//             lista: document.getElementById("lista_lotes_tula")
//         }
//     };

//     try {
//         const response = await fetch("http://localhost:3000/api/dashbard");
//         const data = await response.json();

//         console.log("Data recibida:", data);

//         if (data.success && data.data) {
//             Object.entries(data.data).forEach(([nombreClase, clase]) => {
//                 if (tarjetas[nombreClase]) {
//                     // ✅ Actualizar título y cantidad total
//                     tarjetas[nombreClase].cantidad.textContent = clase.total_cantidad || 0;

//                     // ✅ Limpiar lista antes de agregar nuevos elementos
//                     tarjetas[nombreClase].lista.innerHTML = "";

//                     // ✅ Agregar lotes a la tarjeta correspondiente
//                     clase.lotes.forEach(lote => {
//                         // Si la cantidad del lote es 0, no se pinta
//                         if (lote.cantidad === 0) return;

//                         const li = document.createElement("li");
//                         li.classList.add("flex", "space-x-2");

//                         // 📌 Cambiar color de cantidad si es menor a 50
//                         let cantidadClase = "";
//                         if (lote.cantidad < 50) {
//                             cantidadClase = "text-red-500 dark:text-red-500";
//                         } else if (lote.cantidad < 100) {
//                             cantidadClase = "text-yellow-300 dark:text-yellow-300";
//                         } else {
//                             cantidadClase = "text-green-500 dark:text-green-500";
//                         }

//                         li.innerHTML = `
//                             <p class="font-bold text-lg text-white dark:text-white">${lote.lote_codigo}</p>
//                             <p class="font-normal text-lg text-gray-200 dark:text-gray-200">${lote.marca}</p>
//                             <p class="font-bold text-lg ${cantidadClase} ml-auto text-right">${lote.cantidad}</p>
//                         `;
//                         tarjetas[nombreClase].lista.appendChild(li);
//                     });
//                 }
//             });

//         } else {
//             console.error("Error: No hay registros");
//         }

//     } catch (error) {
//         console.error("Error al obtener datos dashboard:", error);
//     }
// });


// Pintar tabla tarjeta SELECCIONADA
// async function pintarlTablaTarjetaActiva() {
//     try {
//         // Obtener datos del servidor
//         const response = await fetch('http://localhost:3000/api/tablaTarjetaActiva');
//         // Convierte la respuesta en JSON
//         const resultado = await response.json()
//         // Selecciona el <tbody> y lo limpia
//         const tbody = document.querySelector('#tablaDetallestarjeta tbody');

//         //validacion
//         if (!Array.isArray(resultado)) {
//             console.warn("Respuesta inesperada del servidor:", resultado);
//             return
//         }

//         resultado.forEach(e => {
//             const fila = `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//             <td class="text-left px-6 py-2" > ${e.lote}</td>
//             <td class="text-left px-6 py-2">${e.marca}</td>
//             <td class="text-left px-6 py-2">${e.clase}</td>
//             <td class="text-left px-6 py-2 font-bold">${e.cantidad}</td>
//             </tr>`;
//             // agrega cada fila a la tabla
//             tbody.innerHTML += fila;
//         });

//     }catch (error) {
//         console.error("Error al obtener los detalles de la tarjeta", error);
//     };
// }

// window.addEventListener('DOMContentLoaded', pintarlTablaTarjetaActiva);


// document.addEventListener("DOMContentLoaded", async () => {

//     const tituloGranel = document.getElementById("titulo_card_granel");
//     const cantidadGranel = document.getElementById("cantidad_total_granel");
//     const listaLotesGranel = document.getElementById("lista_lotes_granel");

//     // Verificar si los elementos existen antes de modificar el DOM
//     if (!tituloGranel || !cantidadGranel || !listaLotesGranel) {
//         console.error("Error: Uno o más elementos del DOM no existen");
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:3000/api/lotes/granel")

//         const data = await response.json();

//         console.log("Raw Response:", data);

//         if (data.success) {
//             // tituloGranel.textContent = "Granel" + data.data[0].total_cantidad;
//             cantidadGranel.textContent = data.data[0].total_cantidad;

//             listaLotesGranel.innerHTML = "";
//             data.data.forEach(lote => {
//                 const li = document.createElement("li");
//                 li.classList.add("item_granel", "flex", "space-x-2");

//                 // Pintar de acuerdo a la cantidad
//                 let cantidadClase = "";
//                 if (lote.cantidad < 50) {
//                     cantidadClase = "text-red-500 dark:text-red-500";
//                 } else if (lote.cantidad < 100) {
//                     cantidadClase = "text-yellow-300 dark:text-yellow-300";
//                 } else {
//                     cantidadClase = "text-green-500 dark:text-green-500";
//                 }

//                 li.innerHTML = `
//                     <p class="font-bold text-lg text-white dark:text-white">${lote.lote_codigo}</p>
//                     <p class="font-normal text-lg text-gray-200 dark:text-gray-200">${lote.marca}</p>
//                     <p class="font-bold text-lg ${cantidadClase} ml-auto text-right">${lote.cantidad}</p>
//                 `;
//                 listaLotesGranel.appendChild(li);

//             });
//         } else {
//             tituloGranel.textContent = "Error: No hay registros";
//         }
//     } catch (error) {
//         console.error("Error al obtener datos:", error);
//     }


// });



document.addEventListener("DOMContentLoaded", async () => {

    async function pintarTablaUsuarios() {
        try {
            // fect al endpoint para obtener los datos
            const response = await fetch('http://localhost:3000/api/usuarios');
            // convertimos en json los datos
            const data = await response.json();
            // seleccionamos el elemento HTML donde se va a pintar la informacion
            const tbody = document.querySelector('#tablaUsuariosPrueba tbody');

            // itera y prepara el elemento html a insertar (fila)
            data.forEach(element => {
                const fila = `<tr>
                <td>${element.nombre}</td>
                <td>${element.apellido}</td>
                <td>${element.documento}</td>
                </tr>`

                //Agrega la fila a la tabla
                tbody.innerHTML += fila;
            });

        } catch (error) {
            console.error("Ha ocurrido un error al pintar la tabla", error);
        }
    }

    async function pintarTarjetasClases() {
        try {
            // fetch al endpoint para obtener los datos de las cantidades
            const response = await fetch('http://localhost:3000/api/cantidadesPorClase');
            // convertir en json los datos
            const data = await response.json();

            // seleccionar los elementos HTML donde se van a pintar
            const tarjetaGranel = document.querySelector('#cantidad_granel p');
            const tarjetaKilo = document.querySelector('#cantidad_kilo p');
            const tarjetaMalla = document.querySelector('#cantidad_malla p');
            const tarjetaTula = document.querySelector('#cantidad_tula p');

            // iterar sobre cada elemento para preparar la insersion <p>
            data.forEach(element => {
                const fila = `<p>${element.sumaXclase}</p>`

                switch (element.nombre) {
                    case "Granel":
                        tarjetaGranel.innerHTML += fila
                        break;
                    case "Kilo":
                        tarjetaKilo.innerHTML += fila
                        break;
                    case "Malla":
                        tarjetaMalla.innerHTML += fila
                        break;
                    case "Tula":
                        tarjetaTula.innerHTML += fila
                        break;
                    default:
                        break;
                }
            });
        } catch (error) {
            console.error("Ha ocurrido un error al pintar las cantidades", error);
        }
    }


    // 




    pintarTablaUsuarios();
    pintarTarjetasClases();

})



// pintar el detalle de la Tarjeta
function pintarDetalleTarjeta(idTarjeta) {
    const divPintar = document.querySelector('#encabezado_tabla_detalle p strong');

    switch (idTarjeta) {
        case "tarjeta_granel":
            divPintar.innerHTML = `<strong class="bg-gray-600 text-white rounded px-2 font-semibold">Granel</strong>`;
            pintarDetalles("Granel");
            break;
        case "tarjeta_kilo":
            divPintar.innerHTML = `<strong class="bg-gray-600 text-white rounded px-2 font-semibold">Kilo</strong>`;
            pintarDetalles("Kilo");

            break;
        case "tarjeta_malla":
            divPintar.innerHTML = `<strong class="bg-gray-600 text-white rounded px-2 font-semibold">Malla</strong>`;
            pintarDetalles("Malla");

            break;
        case "tarjeta_tula":
            divPintar.innerHTML = `<strong class="bg-gray-600 text-white rounded px-2 font-semibold">Tula</strong>`;
            pintarDetalles("Tula");

            break;
        default:
            break;
    }
}



// Manejar las activaciones de las tarjetas
function activacionDeTarjetas() {
    const tarjetas = document.querySelectorAll('.card');

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', function () {
            // desactivar las tarjetas
            tarjetas.forEach(t => t.classList.remove('bg-gray-800', 'ring-2'));

            // activa la tarjeta clickeada, agregar el bg de activo
            this.classList.add('bg-gray-800', 'ring-2', 'ring-emerald-600');

            // accion prueba funcion "mostrarDetalles"
            console.log("Se ejecuta mostrar detalle", this.id);
            pintarDetalleTarjeta(this.id);
        })
    })
}




// pintar la tabla de detalles
async function pintarDetalles(nombreTarjeta) {
    try {
        // validacion de que el parametro no este vacio
        if (!nombreTarjeta || nombreTarjeta.trim() === '') {
            console.warn("No se proporcionó un nombre de tarjeta válido.");
            return;
        }

        // fetch al endpoint para obtener detalles de la tarjeta seleccionada
        const response = await fetch(`http://localhost:3000/api/detallesClase?nombre=${encodeURIComponent(nombreTarjeta)}`)

        // validacion
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        // ordena los resultados en formato json
        const responseData = await response.json();
        const data = responseData.data;
        // elemento HTML que se va a pintar
        const tbody = document.querySelector('#tablaDetallestarjeta tbody')

        // si data esta vacio
        // if (data.length === 0) {
        //     tbody.innerHTML = `<tr><td colspan="3">No hay datos disponibles para esta tarjeta.</td></tr>`;
        //     return;
        // }

        // limpia el contenido previo
        tbody.innerHTML = '';

        let filaHTML = '';
        data.forEach(element => {
            filaHTML += `<tr class="bg-gray-100 border-b border-gray-50"> 
            <td class="text-gray-800 text-left pl-4">${element.lote_codigo}</td>
            <td class="text-gray-800 text-left pl-4">${element.marca_nombre}</td>
            <td class="text-gray-800 text-left pl-4">${element.cantidad}</td>
            </tr>`

        })
        tbody.innerHTML = filaHTML;

    } catch (error) {
        console.error("Error al pintar la tabla de detalles", error);
    }
}








activacionDeTarjetas();
