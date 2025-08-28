
// listas select
// listado de destinos y selector de destinos
const destinos = ["Ajos Extras", "Dialsa", "De Calidad", "FV", "Hermanos Vasquez"];
const selectorDestino = document.getElementById("select_destino");
// listado de clases y selector de clases
const clases = ["Granel", "Kilo", "Malla", "Tula"];
const selectorClase = document.getElementById("select_clase");



// Función para agregar opciones a un selector
const agregarOpciones = (listado, selector, mensajePredeterminado) => {
    let opcionPredeterminada = document.createElement("option");
    opcionPredeterminada.text = mensajePredeterminado;
    opcionPredeterminada.value = "";
    opcionPredeterminada.disabled = true;
    opcionPredeterminada.selected = true;
    selector.appendChild(opcionPredeterminada);

    listado.forEach(opcion => {
        let nuevaOpcion = document.createElement("option");
        nuevaOpcion.text = opcion;
        nuevaOpcion.value = opcion;
        selector.appendChild(nuevaOpcion);
    });
};
// listar los campos de clase y destino
agregarOpciones(destinos, selectorDestino, "Seleccionar");
agregarOpciones(clases, selectorClase, "Seleccionar");


// Funcion para traer la marca cuando se complete el campo lote
document.getElementById("lote").addEventListener("change", async function () {
    const loteCodigo = this.value; // 📌 Captura el código de lote ingresado
    const marcaAsociada = document.getElementById("marca_asociada");
    console.log("Código de lote ingresado:", loteCodigo); // ✅ Depuración


    if (!loteCodigo) {
        marcaAsociada.value = "Marca no encontrada"; // ✅ Usar `.value`, no `innerHTML`
        return; // Evita consultas innecesarias si el campo está vacío
    }

    try {
        const response = await fetch(`http://localhost:3000/api/marca-lote/${loteCodigo}`);
        const data = await response.json();

        if (data.success) {
            marcaAsociada.value = data.nombre_marca; // ✅ Mostrar el nombre de la marca directamente
        } else {
            marcaAsociada.value = "Marca no encontrada"; // ✅ Evitar `alert()` que interrumpe UX
        }
    } catch (error) {
        console.error("Error al obtener la marca:", error);
        marcaAsociada.value = "Error al obtener marca"; // ✅ Mensaje claro en caso de error
    }
});


// Registrar una salida
document.getElementById("formulario_salidas").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita el envío tradicional del formulario

    // capturar los valores del form
    const vale = document.getElementById("vale").value; // la base de datos lo toma como string
    const destino = document.getElementById("select_destino").value;
    const lote = document.getElementById("lote").value;
    const marca = document.getElementById("marca_asociada").value;
    const clase = document.getElementById("select_clase").value;
    const cantidad = document.getElementById("cantidad").value;
    const usuario_id = localStorage.getItem("usuario_id");

    // Validación básica
    if (!vale || !destino || !lote || !marca || !clase || cantidad <= 0 || !usuario_id) {
        alert("Todos los campos son obligatorios y la cantidad debe ser mayor a 0.");
        return;
    }

    // objeto con los datos de salida
    const datosSalida = {
        vale: vale,
        nombreDestino: destino,
        lote_codigo: parseInt(lote),
        nombreMarca: marca,
        nombreClase: clase,
        cantidad: parseInt(cantidad),
        usuario_id: parseInt(usuario_id)
    };

    try {
        const response = await fetch("http://localhost:3000/api/salidas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosSalida)
        });

        console.log("Estado de la respuesta: ", response.status); // depuracion

        const resultado = await response.json();

        console.log("Respuesta del servidor: ", resultado); // depuracion


        if (resultado.success) {
            alert(`Salida registrada exitosamente!
                vale: ${vale},
                lote: ${lote},
                marca: ${marca},
                clase: ${clase},
                cantidad: ${cantidad},
                destino: ${destino}`);
            document.getElementById("formulario_salidas").reset(); // Limpiar formulario
        } else {
            alert("Error al registrar la salida");
        }
    } catch (error) {
        console.error("Error en la petición: ", error);
        alert("Hubo un problema al registrar la salida.")
    }
});