import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

interface TopCountryI {
  country: string;
  customers: number;
}

interface ReportOptionsI {
  title?: string;
  subTitle?: string;
  topCountries: TopCountryI[];
}

const generateTopCountryDonut = async (topCountry: TopCountryI[]) => {
  const data = {
    labels: topCountry.map((country) => country.country),
    datasets: [
      {
        label: 'Dataset 1',
        // data: Utils.numbers(NUMBER_CFG),
        data: topCountry.map((country) => country.customers),
        // backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: 'left',
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

export const getStatisticsReport = async (options: ReportOptionsI) => {
  const donutChart = await generateTopCountryDonut(options.topCountries);
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        image: donutChart,
        width: 500,
      },
    ],
  };
  return docDefinition;
};
