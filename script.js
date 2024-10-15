// script.js
document.addEventListener("DOMContentLoaded", function () {
  const ingresosInput = document.getElementById("ingresos");
  const costosVariablesInput = document.getElementById("costosVariables");
  const costosFijosInput = document.getElementById("costosFijos");
  const resultadoDiv = document.getElementById("resultado");
  const ctx = document.getElementById("myChart").getContext("2d");
  let chart;

  function actualizarResultado() {
    const ingresos = parseFloat(ingresosInput.value);
    const costosVariables = parseFloat(costosVariablesInput.value);
    const costosFijos = parseFloat(costosFijosInput.value);

    //Validación de que los valores ingresados sean numéricos y positivos.
    if (
      isNaN(ingresos) ||
      isNaN(costosVariables) ||
      isNaN(costosFijos) ||
      ingresos <= 0 ||
      costosVariables <= 0 ||
      costosFijos <= 0
    ) {
      resultadoDiv.textContent =
        "Por favor, ingrese valores numéricos y positivos en todos los campos.";
      if (chart) {
        chart.destroy();
      }
      return;
    }

    const puntoEquilibrioUnidades = costosFijos / (ingresos - costosVariables);
    const puntoEquilibrioMonetario = puntoEquilibrioUnidades * ingresos;

    const formatoMoneda = new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 0,
    });

    resultadoDiv.textContent = `El punto de equilibrio es de ${formatoMoneda.format(
      puntoEquilibrioUnidades
    )} unidades (${formatoMoneda.format(
      puntoEquilibrioMonetario
    )} en valor monetario).`;

    const labels = [
      "Costos Fijos Totales",
      "Costos Variables Totales",
      "Ingresos Totales",
    ];
    const data = [
      costosFijos,
      costosVariables * puntoEquilibrioUnidades,
      ingresos * puntoEquilibrioUnidades,
    ];

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Punto de Equilibrio",
            data: data,
            backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Monto en Moneda Local",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                label += context.raw;
                if (context.dataIndex === 0) {
                  label += " (Costos Fijos Totales)";
                } else if (context.dataIndex === 1) {
                  label += " (Costos Variables Totales)";
                } else if (context.dataIndex === 2) {
                  label += " (Ingresos Totales)";
                }
                return label;
              },
            },
          },
          title: {
            display: true,
            text: "Representación Gráfica del Punto de Equilibrio",
          },
        },
      },
    });
  }

  ingresosInput.addEventListener("input", actualizarResultado);
  costosVariablesInput.addEventListener("input", actualizarResultado);
  costosFijosInput.addEventListener("input", actualizarResultado);
});
