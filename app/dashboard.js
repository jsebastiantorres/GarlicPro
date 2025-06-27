document.addEventListener("DOMContentLoaded", async () => {
    // 📌 Obtener referencias a las tarjetas en el DOM
    const tarjetas = {
        "Granel": {
            titulo: document.getElementById("titulo_card_granel"),
            cantidad: document.getElementById("cantidad_total_granel"),
            lista: document.getElementById("lista_lotes_granel")
        },
        "Malla": {
            titulo: document.getElementById("titulo_card_malla"),
            cantidad: document.getElementById("cantidad_total_malla"),
            lista: document.getElementById("lista_lotes_malla")
        },
        "Kilo": {
            titulo: document.getElementById("titulo_card_kilo"),
            cantidad: document.getElementById("cantidad_total_kilo"),
            lista: document.getElementById("lista_lotes_kilo")
        },
        "Tula": {
            titulo: document.getElementById("titulo_card_tula"),
            cantidad: document.getElementById("cantidad_total_tula"),
            lista: document.getElementById("lista_lotes_tula")
        }
    };

    try {
        const response = await fetch("http://localhost:3000/api/dashbard");
        const data = await response.json();

        console.log("Data recibida:", data);

        if (data.success && data.data) {
            Object.entries(data.data).forEach(([nombreClase, clase]) => {
                if (tarjetas[nombreClase]) {
                    // ✅ Actualizar título y cantidad total
                    tarjetas[nombreClase].cantidad.textContent = clase.total_cantidad || 0;

                    // ✅ Limpiar lista antes de agregar nuevos elementos
                    tarjetas[nombreClase].lista.innerHTML = "";

                    // ✅ Agregar lotes a la tarjeta correspondiente
                    clase.lotes.forEach(lote => {
                        // Si la cantidad del lote es 0, no se pinta
                        if (lote.cantidad === 0) return;

                        const li = document.createElement("li");
                        li.classList.add("flex", "space-x-2");

                        // 📌 Cambiar color de cantidad si es menor a 50
                        let cantidadClase = "";
                        if (lote.cantidad < 50) {
                            cantidadClase = "text-red-500 dark:text-red-500";
                        } else if (lote.cantidad < 100) {
                            cantidadClase = "text-yellow-300 dark:text-yellow-300";
                        } else {
                            cantidadClase = "text-green-500 dark:text-green-500";
                        }

                        li.innerHTML = `
                            <p class="font-bold text-lg text-white dark:text-white">${lote.lote_codigo}</p>
                            <p class="font-normal text-lg text-gray-200 dark:text-gray-200">${lote.marca}</p>
                            <p class="font-bold text-lg ${cantidadClase} ml-auto text-right">${lote.cantidad}</p>
                        `;
                        tarjetas[nombreClase].lista.appendChild(li);
                    });
                }
            });

        } else {
            console.error("Error: No hay registros");
        }

    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
});




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







