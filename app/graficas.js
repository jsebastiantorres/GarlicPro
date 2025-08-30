

console.log("Escuchando desde graficas.js");


// Dashboard Graficas
window.onload = function () {

    // DATA real 
    var data = [
        { marca: 'Nasa', cantidad: 120 },
        { marca: 'Surti Abarrotes BJ', cantidad: 200 },
        { marca: 'Fruyt Garlic', cantidad: 150 },
        { marca: 'PAG', cantidad: 80 },
        { marca: 'Posso', cantidad: 70 },
        { marca: 'El Rey', cantidad: 110 },
        { marca: 'Barajas', cantidad: 130 },
        { marca: 'Import chiki', cantidad: 157 }
    ]

    // Ordena el array
    data.sort((a, b) => a.cantidad - b.cantidad);

    // Creamos un array con solo las cantidades
    var cantidades = data.map(element => element.cantidad);

    // Creamos un array con solo las marcas 
    var marcas = data.map(element => element.marca);

    // Pintar la grafica
    function graficaCantidadXmarcas() {
        // Elemento del DOM
        var elemtoDom = document.getElementById('chart_div1');
        // validacion DOM
        if (!elemtoDom) {
            console.error('No se encontró el chart_div1');
            return;
        }

        // Se inicializa la instancia del Chart 
        let myCharts = echarts.init(elemtoDom);

        // Comportamiento de la grafica
        var option = {
            // valor en x
            xAxis: {
                type: 'value',
            },
            // valor en y
            yAxis: {
                type: 'category',
                data: marcas
            },
            series: [
                {
                    data: cantidades,
                    type: 'bar',
                    label: { // Activa las etiquetas
                        show: true,
                        position: 'right',
                        fontSize: 12,
                    },
                    itemStyle: {
                        emphasis: {
                            color: '#EAB308'
                        }
                    }

                }
            ],
            color: '#065F46',
            textStyle: {
                fontFamily: '"Segoe UI", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontSize: 16,
                fontWeight: 'normal',
                color: '#333'
            },
            tooltip: {
                trigger: 'axis',
                borderColor: '#EAB308'
                // tooltipContent: yAxis.data,]]
            }
        }

        myCharts.setOption(option);
    }

    graficaCantidadXmarcas();
}
