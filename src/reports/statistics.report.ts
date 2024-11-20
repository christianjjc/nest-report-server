import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateDonutChart, generateLineChart } from './charts';
import { headerSection } from './sections';

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
  const [donutChart, lineChart] = await Promise.all([
    generateDonutChart({
      entries: options.topCountries.map((c) => ({
        label: c.country,
        value: c.customers,
      })),
      position: 'left',
    }),
    generateLineChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadísticas de Clientes',
      subTitle: options.subTitle ?? 'Top 10 países con más clientes',
    }),
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
      {
        image: lineChart,
        width: 500,
        margin: [0, 20, 0, 0],
      },
    ],
  };
  return docDefinition;
};
