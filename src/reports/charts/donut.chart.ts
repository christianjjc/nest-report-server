import * as Utils from '../../helpers/chart-utils';

interface DonutEntryI {
  label: string;
  value: number;
}

interface DonutOptionsI {
  position?: 'left' | 'right' | 'top' | 'bottom';
  entries: DonutEntryI[];
}

export const generateDonutChart = async (options: DonutOptionsI): Promise<string> => {
  const { position = 'top' } = options;

  const data = {
    labels: options.entries.map((e) => e.label),
    datasets: [
      {
        label: 'Dataset 1',
        // data: Utils.numbers(NUMBER_CFG),
        data: options.entries.map((e) => e.value),
        // backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: position,
      },
      // title: {
      //   text: 'Chart.js Doughnut Chart',
      //   display: true,
      // },
      responsive: true,
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
