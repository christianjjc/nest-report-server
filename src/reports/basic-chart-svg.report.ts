import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'], // Set X-axis labels
      datasets: [
        {
          label: 'Mi Primer Gráfico', // Create the 'Users' dataset
          data: [120, 60, 50, 180, 120, 250, 50], // Add data to the chart,
          backgroundColor: 'rgba(93, 75, 192, 0.2)',
          borderColor: 'rgba(81, 75, 192)',
          borderWidth: 1,
        },
      ],
    },
  };
  return Utils.chartJsToImage(chartConfig /* , { height: 50, width: 50 } */);
};

export const getBasicChartSvgReport = async (): Promise<TDocumentDefinitions> => {
  const chart = await generateChartImage();

  return {
    content: [
      {
        svg: svgContent,
        width: 100,
        fit: [100, 100],
      },
      {
        image: chart,
        width: 500,
      },
    ],
  };
};
