
// listado de marcas y selector de marcas
const marcas = ["Nasa", "Surti Abarrotes BJ", "Fruyt Garlic", "PAG", "Posso", "El Rey", "Barajas", "Import chiki"];
const selectorMarca = document.getElementById("select_marca");

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

agregarOpciones(marcas, selectorMarca, "Seleccionar");
agregarOpciones(clases, selectorClase, "Seleccionar");

console.log("Corriendo el script de forms.js");



// Resgistrar ingreso
document.getElementById("formulario_ingresos").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Captura los valores de los campos del formulario
    const lote = document.getElementById("lote").value;
    const marca = document.getElementById("select_marca").value;
    const clase = document.getElementById("select_clase").value;
    const cantidad = document.getElementById("cantidad").value;
    const usuario_id = localStorage.getItem("usuario_id"); // Obtener el ID del usuario desde localStorage

    // Validación básica
    if (!lote || !marca || !clase || cantidad <= 0) {
        alert("Todos los campos son obligatorios y la cantidad debe ser mayor a 0.");
        return;
    }


    // Crear objeto con los datos
    const datosIngreso = {
        lote_codigo: parseInt(lote), // Asegurarse de que el lote sea un número
        marca_id: marca,
        clase_id: clase,
        cantidad: parseInt(cantidad),   // Asegurarse de que la cantidad sea un número
        usuario_id: parseInt(usuario_id)  // Agregar el ID del usuario
    };
    console.log("Datos a enviar:", datosIngreso); // Depuración

    try {
        const response = await fetch("http://localhost:3000/api/ingresos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosIngreso)
        });

        const resultado = await response.json();
        console.log("Respuesta del servidor:", resultado); // Depuración

        if (resultado.success) {
            // Si el registro fue exitoso, puedes mostrar un mensaje al usuario con los datos del lote ingresado
            alert(`Ingreso registrado exitosamente!: 
                lote: ${lote},
                marca: ${marca},
                clase: ${clase},
                cantidad: ${cantidad}`);
            document.getElementById("formulario_ingresos").reset(); // Limpiar formulario
        } else {
            alert("Error al registrar el ingreso: " + resultado.message);
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        alert("Hubo un problema al registrar el ingreso.");
    }
});

