import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: [2012, 2013, 2014, 2015, 2016], // Set X-axis labels
      datasets: [
        {
          label: 'Users', // Create the 'Users' dataset
          data: [120, 60, 50, 180, 120], // Add data to the chart
        },
      ],
    },
  };
  return Utils.chartJsTiImage(chartConfig);
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
