import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateDonutChart } from './charts';

interface TopCountryI {
  country: string;
  customers: number;
}

interface ReportOptionsI {
  title?: string;
  subTitle?: string;
  topCountries: TopCountryI[];
}

export const getStatisticsReport = async (options: ReportOptionsI) => {
  const donutChart = await generateDonutChart({
    entries: options.topCountries.map((c) => ({
      label: c.country,
      value: c.customers,
    })),
    position: 'left',
  });
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10 países con más clientes',
                alignment: 'center',
                bold: true,
                margin: [0, 0, 0, 10],
              },
              {
                image: donutChart,
                width: 350,
              },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [['Country', 'Customers'], ...options.topCountries.map((c) => [c.country, c.customers])],
            },
          },
        ],
      },
    ],
  };
  return docDefinition;
};
