console.log("corriendo el script de tabla_ingresos");


// Obtener los datos del servidor y pintar tabla de ingresos
async function pintarTablaIngresos() {
    try {
        // Obtener datos del servidor
        const response = await fetch('http://localhost:3000/api/tablaIngresos');
        // Convierte la respuesta en JSON
        const resultado = await response.json()
        // Selecciona el <tbody> y lo limpia
        const tbody = document.querySelector('#tablaIngresos tbody');

        //validacion
        if (!Array.isArray(resultado)) {
            console.warn('Respuesta inesperada del servidor:', resultado);
            return;
        }


        // por cada ingreso recibido, se crea una fila <tr> con sus celdas <td> Formatea la fecha para que se vea amigable.
        resultado.forEach(ingreso => {
            const fila = `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"> 
            <td class="text-left px-6 py-2">${ingreso.lote_codigo}</td>
            <td class="text-left px-6 py-2">${ingreso.marca}</td>
            <td class="text-left px-6 py-2">${ingreso.clase}</td>
            <td class="text-left px-6 py-2 font-bold">${ingreso.cantidad}</td>
            <td class="text-left px-6 py-2">${new Date(ingreso.fecha_ingreso).toLocaleString('es-CO', {
                weekday: 'long',   // día de la semana
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            })
                }</td>
            </tr>`;

            // Agrega cada fila a la tabla
            tbody.innerHTML += fila;
        });

    } catch (error) {
        console.error('Error cargando ingresos', error);
    }
}

window.addEventListener('DOMContentLoaded', pintarTablaIngresos);

//<td>${new Date(ingreso.fecha_registro).toLocaleDateString()}</td>