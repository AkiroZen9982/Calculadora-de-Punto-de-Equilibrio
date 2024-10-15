// script.js
document.addEventListener('DOMContentLoaded', function() {
    const ingresosInput = document.getElementById('ingresos');
    const costosVariablesInput = document.getElementById('costosVariables');
    const costosFijosInput = document.getElementById('costosFijos');
    const resultadoDiv = document.getElementById('resultado');
    const ctx = document.getElementById('myChart').getContext('2d');

    let chart;

    function actualizarResultado() {
        const ingresos = parseFloat(ingresosInput.value);
        const costosVariables = parseFloat(costosVariablesInput.value);
        const costosFijos = parseFloat(costosFijosInput.value);

        if (isNaN(ingresos) || isNaN(costosVariables) || isNaN(costosFijos) || ingresos <= 0 || costosVariables <= 0 || costosFijos <= 0) {
            resultadoDiv.textContent = 'Por favor, ingrese valores numéricos y positivos en todos los campos.';
            if (chart) {
                chart.destroy();
            }
            return;
        }

        const puntoEquilibrioUnidades = costosFijos / (ingresos - costosVariables);
        const puntoEquilibrioMonetario = puntoEquilibrioUnidades * ingresos;
        resultadoDiv.textContent = `El punto de equilibrio es de ${puntoEquilibrioUnidades.toFixed(2)} unidades (${puntoEquilibrioMonetario.toFixed(2)} en valor monetario).`;

        const labels = ['Costos Fijos Totales', 'Costos Variables Por Unidad', 'Ingresos Por Unidad'];
        const data = [costosFijos, costosVariables * puntoEquilibrioUnidades, ingresos * puntoEquilibrioUnidades];

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Punto de Equilibrio',
                    data: data,
                    backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    ingresosInput.addEventListener('input', actualizarResultado);
    costosVariablesInput.addEventListener('input', actualizarResultado);
    costosFijosInput.addEventListener('input', actualizarResultado);
});

