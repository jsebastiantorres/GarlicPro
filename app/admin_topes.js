

// Valores de stock
var topesStock = {
    stockReal: 4901,
    stockOptimo: 2000,
    stockMaximo: 5000,
    stockAlerta: 300
}


// función para validar el stock
function validarStock(objetoTopes) {

    let diferenciaStockOptimo = 0;
    let mensaje = "";

    diferenciaStockOptimo = objetoTopes.stockOptimo - objetoTopes.stockReal; // calcular la diferencia con el stock Optimo

    // Validación tope maximo
    let topeMaxPrecaucion = objetoTopes.stockMaximo - 100;
    if (objetoTopes.stockReal >= topeMaxPrecaucion) {
        let diferenciaStockMaximo = objetoTopes.stockMaximo - objetoTopes.stockReal;
        mensaje = `Stock cercano al tope máximo de la bodega: ${objetoTopes.stockMaximo} diferencia ${diferenciaStockMaximo}`
        console.log(mensaje);
        return
    }

    // Validación stock critico
    if (objetoTopes.stockReal < objetoTopes.stockOptimo) {
        // mostar el mensaje
        mensaje = `Stock Bajo! Diferencia: - ${diferenciaStockOptimo}`


        if (objetoTopes.stockReal < objetoTopes.stockAlerta) {
            mensaje = `Stock Alerta! Diferencia: - ${diferenciaStockOptimo}`
        }
    } else {
        diferenciaStockOptimo = objetoTopes.stockReal - objetoTopes.stockOptimo; // calcular la diferencia con el stock Optimo
        mensaje = `Stock Optimo! Diferencia: + ${diferenciaStockOptimo}`
    }

    console.log(mensaje);
}

validarStock(topesStock);