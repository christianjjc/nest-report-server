import * as Utils from '../../helpers/chart-utils';

export const generateLineChart = async (): Promise<string> => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Reporte de Movimientos de Inventario',
        data: Utils.numbers({ count: 6, min: -100, max: 100 }),
        borderColor: Utils.NAMED_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
        pointStyle: 'circle',
        pointRadius: 5,
        // pointHoverRadius: 15,
      },
    ],
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      legend: {
        position: 'top',
      },
      //   responsive: true,
      //   plugins: {
      //     title: {
      //       display: true,
      //       text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
      //     },
      //   },
    },
  };

  return Utils.chartJsToImage(config, { width: 500, height: 200 });
};
