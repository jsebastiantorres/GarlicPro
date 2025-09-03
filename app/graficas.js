

async function graficaCantidadXmarcas(arrMarcaCantidad) {

    // DATA prueba 
    // var data = [
    //     { marca: 'Nasa', cantidad: 120 },
    //     { marca: 'Surti Abarrotes BJ', cantidad: 200 },
    //     { marca: 'Fruyt Garlic', cantidad: 150 },
    //     { marca: 'PAG', cantidad: 80 },
    //     { marca: 'Posso', cantidad: 70 },
    //     { marca: 'El Rey', cantidad: 110 },
    //     { marca: 'Barajas', cantidad: 130 },
    //     { marca: 'Import chiki', cantidad: 157 }
    // ]

    // DATA REAL
    var data = arrMarcaCantidad;

    // Ordena el array
    data.sort((a, b) => a.cantidad - b.cantidad);

    // Creamos un array con solo las cantidades
    var cantidades = data.map(element => element.cantidad);

    // Creamos un array con solo las marcas 
    var marcas = data.map(element => element.marca);

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
        }
    }

    myCharts.setOption(option);
}




console.log("Escuchando desde graficas.js");


// Dashboard Graficas
window.onload = function () {



    // GRAFICA
    // Pintar la grafica


    // graficaCantidadXmarcas();


    // Grafica Entradas VS Salidas
    function graficaEntradasSalidas() {
        var chartDom = document.getElementById('div_chart2');
        if (!chartDom) {
            console.error('No se encontró el div_chart2');
            return;
        }

        var myChart = echarts.init(chartDom);
        var option = {
            legend: { position: 'none' },
            tooltip: {
                trigger: 'axis',
                borderColor: '#065F46'
            },
            dataset: {
                dimensions: ['dia', 'Entradas', 'Salidas'],
                source: [
                    { dia: 'lunes', 'Entradas': 1000, 'Salidas': 500 },
                    { dia: 'martes', 'Entradas': 1000, 'Salidas': 500 },
                    { dia: 'miercoles', 'Entradas': 789, 'Salidas': 1500 },
                    { dia: 'jueves', 'Entradas': 800, 'Salidas': 500 },
                    { dia: 'viernes', 'Entradas': 1987, 'Salidas': 500 },
                    { dia: 'sabado', 'Entradas': 1532, 'Salidas': 500 },
                    { dia: 'domingo', 'Entradas': 1012, 'Salidas': 500 }
                ]
            },
            xAxis: {
                type: 'category', axisLabel: {
                    interval: 0 // 👈 Muestra todas las etiquetas sin saltos
                }
            },
            yAxis: {},
            series: [{ type: 'bar' }, { type: 'bar' }],
            color: ['#065F46', '#EAB308',],
            textStyle: {
                fontFamily: '"Segoe UI", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontSize: 10,
                fontWeight: 'normal',
                color: '#333'
            },

        };

        myChart.setOption(option);
    };

    // graficaCantidadXmarcas();
    graficaEntradasSalidas();



    // Grafica Bodega General
    function graficaBodegaGeneral() {
        // Elemento del DOM 
        let charDom = document.getElementById('chart_div3');
        // validacion del elemento
        if (!charDom) {
            console.error("No se encontró el elemento chart_div3");
            return
        }

        // Inicializa el chart
        let myChart = echarts.init(charDom);

        // Comportamiento del Chart
        let option = {
            tooltip: {
                trigger: 'item'
            },
            legend: { position: 'none' },
            series: [
                {
                    name: 'Bodega General',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 8,
                        borderColor: '#fff',
                        borderWidth: 4
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 24,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 156, name: 'Granel' },
                        { value: 307, name: 'Kilo' },
                        { value: 501, name: 'Malla' },
                        { value: 154, name: 'Tula' }
                    ]
                }
            ],
            color: ['#065F46', '#15803D', '#EAB308', '#FDE047', '#FECACA'],
            textStyle: {
                fontFamily: '"Segoe UI", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontSize: 10,
                fontWeight: 'normal',
                color: '#333'
            },
        };

        myChart.setOption(option);

    }

    graficaBodegaGeneral();
}



export async function formateandoDataMarcas(arrMarcas) {
    const sumaPorMarca = arrMarcas.reduce((acumulador, elemento) => {
        // si la marca no existe el acumulador la crea
        if (!acumulador[elemento.marca_nombre]) {
            acumulador[elemento.marca_nombre] = {
                sumaMarca: 0,
                items: []
            };
        }

        // Suma el precio al total de la marca
        acumulador[elemento.marca_nombre].sumaMarca += elemento.cantidad;
        // Adreda la marca a la lista de los elementos
        acumulador[elemento.marca_nombre].items.push(elemento);
        return acumulador
    }, {});


    console.log(sumaPorMarca);

    let arrayNombreCantidad = [];

    // Creando array para pintar la grafica
    for (const [nombreMarca, cantidad] of Object.entries(sumaPorMarca)) {
        const totalMarca = cantidad.sumaMarca;
        const barra = { marca: nombreMarca, cantidad: totalMarca }
        console.log(`nombre de objeto ${nombreMarca}, cantidad: ${totalMarca}`);
        arrayNombreCantidad.push(barra);
    }

    // Se envia ell array a la funcion que pinta la grafica
    console.log(arrayNombreCantidad);

    graficaCantidadXmarcas(arrayNombreCantidad);

}