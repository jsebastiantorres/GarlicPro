
import { formateandoDataMarcas, pintarDonaBodegaGeneral } from './graficas.js';

// al seleccionar tarjeta
// pintar el detalle y movimientos de la Tarjeta
async function pintarDetalleTarjeta(idTarjeta) {
    const divPintar = document.querySelectorAll('.encabezados_tablas_clase');

    switch (idTarjeta) {
        case "tarjeta_granel":
            divPintar.forEach(elemento => elemento.innerHTML = `<strong class="bg-gray-600 text-white rounded px-2 font-semibold select-none">Granel</strong>`)
            pintarDetalles("Granel");
            pintarMovimientosClase("Granel");
            break;
        case "tarjeta_kilo":
            divPintar.forEach(elemento => elemento.innerHTML = `<strong class="bg-gray-600 text-white rounded px-2 font-semibold select-none">Kilo</strong>`)
            pintarDetalles("Kilo");
            pintarMovimientosClase("Kilo");
            break;
        case "tarjeta_malla":
            divPintar.forEach(elemento => elemento.innerHTML = `<strong class="bg-gray-600 text-white rounded px-2 font-semibold select-none">Malla</strong>`)
            pintarDetalles("Malla");
            pintarMovimientosClase("Malla");
            break;
        case "tarjeta_tula":
            divPintar.forEach(elemento => elemento.innerHTML = `<strong class="bg-gray-600 text-white rounded px-2 font-semibold select-none">Tula</strong>`)
            pintarDetalles("Tula");
            pintarMovimientosClase("Tula");
            break;
        default:
            // Se establece la clase por defecto para evitar que los elementos queden vacios
            divPintar.forEach(elemento => elemento.innerHTML = `<strong class="bg-gray-600 text-white rounded px-2 font-semibold select-none">Tula</strong>`)
            pintarDetalles("Granel");
            pintarMovimientosClase("Granel");
            break;
    }
}

document.addEventListener("DOMContentLoaded", async () => {

    // async function pintarTablaUsuarios() {
    //     try {
    //         // fect al endpoint para obtener los datos
    //         const response = await fetch('http://localhost:3000/api/usuarios');
    //         // convertimos en json los datos
    //         const data = await response.json();
    //         // seleccionamos el elemento HTML donde se va a pintar la informacion
    //         const tbody = document.querySelector('#tablaUsuariosPrueba tbody');

    //         // itera y prepara el elemento html a insertar (fila)
    //         data.forEach(element => {
    //             const fila = `<tr>
    //             <td>${element.nombre}</td>
    //             <td>${element.apellido}</td>
    //             <td>${element.documento}</td>
    //             </tr>`

    //             //Agrega la fila a la tabla
    //             tbody.innerHTML += fila;
    //         });

    //     } catch (error) {
    //         console.error("Ha ocurrido un error al pintar la tabla", error);
    //     }
    // }


    // Pinta el elemento total cajas en dashboard
    async function pintarTotalClases(dataClases) {
        let totalCajas = dataClases.reduce((acumulador, objetoActual) => {
            return acumulador += parseInt(objetoActual.sumaXclase);
        }, 0)

        let elementoDomTotalCajas = document.getElementById('total_cajas');

        elementoDomTotalCajas.innerHTML = totalCajas;

        console.log(dataClases);
        console.log(totalCajas);
    }

    // Pinta la informacion de las clases en las tarjetas del dashboard
    async function pintarTarjetasClases() {
        try {
            // fetch al endpoint para obtener los datos de las cantidades
            const response = await fetch('http://localhost:3000/api/cantidadesPorClase');
            // convertir en json los datos
            const data = await response.json();

            await pintarTotalClases(data);
            await pintarDonaBodegaGeneral(data);
            console.log(data);
            

            // seleccionar los elementos HTML donde se va a pintar las sumas de cada clase
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

    // Manejar las activaciones de las tarjetas
    async function activacionDeTarjetas() {
        const tarjetas = document.querySelectorAll('.card');

        // Define el ID de la tarjeta por defecto
        const defaultCardId = 'tarjeta_granel';

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

        // Activa la tarjeta por defecto visualmente y carga sus detalles al iniciar
        const defaultCard = document.getElementById(defaultCardId);
        if (defaultCard) {
            defaultCard.classList.add('bg-gray-800', 'ring-2', 'ring-emerald-600');
            pintarDetalleTarjeta(defaultCardId);
        }
    }
    // 

    activacionDeTarjetas();
    // pintarTablaUsuarios();
    pintarTarjetasClases();
    // pintarGraficaCantidadPorMarca();
})


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


        console.log(data);
        formateandoDataMarcas(data);

        // elemento HTML que se va a pintar
        const tbody = document.querySelector('#tablaDetallestarjeta tbody')

        //si data esta vacio
        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3">No hay datos disponibles para esta tarjeta.</td></tr>`;
            return;
        }

        // limpia el contenido previo
        tbody.innerHTML = '';

        let filaHTML = '';
        data.forEach(element => {
            filaHTML += `<tr class="bg-gray-100 border-b border-white"> 
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


async function pintarMovimientosClase(nombreTarjeta) {
    try {
        // validacion de que el parametro no este vacio
        if (!nombreTarjeta || nombreTarjeta.trim() === '') {
            console.warn("No se proporcionó un nombre de tarjeta válido para cargar los movimientos");
            return;
        }

        // fetch al endpoint para obtener los movimientos de la tarjeta seleccionada
        const response = await fetch(`http://localhost:3000/api/movimientosClase?nombre=${encodeURIComponent(nombreTarjeta)}`)

        // validacion resultados
        if (!response.ok) {
            throw new Error(`Error en la solicitud: "${response.status}`);
        }

        // ordenar los resultados en JSON
        const responseData = await response.json();
        const data = responseData.data;
        // elemento HTML de la tabla que se va a pintar
        const tbody = document.querySelector('#tablaMovimientosClase tbody')

        // si data esta vacio
        if (data.length === 0) {
            console.log("Data vacio");
            tbody.innerHTML = `<tr><td colspan="5">No hay datos disponibles para esta tarjeta.</td></tr>`;
            return;
        }

        // limpiar el contenido previo
        tbody.innerHTML = '';

        // pintar filas
        let filaHTML = '';
        data.forEach(element => {
            filaHTML += `<tr class="bg-gray-100 border-b border-white">
            <td class="text-gray-800 text-left pl-4">${new Date(element.fecha).toLocaleString('es-CO', {
                weekday: 'long',   // día de la semana
                year: 'numeric', // año
                month: '2-digit', //mes
                day: '2-digit', //dia
                hour: '2-digit', //hora
                minute: '2-digit', //minutos
                second: '2-digit', // seguntos
                hour12: true // formato
            })}</td>
            <td class="text-gray-800 text-left pl-4">${element.tipo_movimiento}</td>
            <td class="text-gray-800 text-left pl-4">${element.lote_codigo}</td>
            <td class="text-gray-800 text-left pl-4">${element.marca}</td>
            <td class="text-gray-800 text-left pl-4">${element.cantidad}</td>
            </tr>`
        })

        tbody.innerHTML = filaHTML;

    } catch (error) {
        console.error("Error al pintar la tabla movimientos", error);
    }
}


