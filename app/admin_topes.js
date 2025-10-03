

// Valores de stock
var topesStock = {
    stockReal: 300,
    stockOptimo: 2000,
    stockMaximo: 5000,
    stockAlerta: 300
}


// función para validar el stock
function validarStock(objetoTopes) {

    let diferenciaStockOptimo = 0;
    let mensaje = "";

    diferenciaStockOptimo = topesStock.stockOptimo - topesStock.stockReal; // calcular la diferencia con el stock Optimo

    // Validación stock critico
    if (topesStock.stockReal < topesStock.stockOptimo) {
        // mostar el mensaje
        mensaje = `Stock Bajo! Diferencia: - ${diferenciaStockOptimo}`


        if (topesStock.stockReal < topesStock.stockAlerta) {
            mensaje = `Stock Alerta! Diferencia: - ${diferenciaStockOptimo}`
        }
    } else {
        diferenciaStockOptimo = topesStock.stockReal - topesStock.stockOptimo; // calcular la diferencia con el stock Optimo
        mensaje = `Stock Optimo! Diferencia: + ${diferenciaStockOptimo}`
    }

    console.log(mensaje);
}

validarStock(topesStock);