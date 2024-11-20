import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateBarsChart, generateDonutChart, generateLineChart /* generateMultiAxisLineChart */ } from './charts';
import { footerSection, headerSection } from './sections';

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
  const [
    //
    donutChart,
    lineChart,
    barsChart,
    // multiAxisLineChart,
  ] = await Promise.all([
    generateDonutChart({
      entries: options.topCountries.map((c) => ({
        label: c.country,
        value: c.customers,
      })),
      position: 'left',
    }),
    generateLineChart(),
    generateBarsChart(),
    // generateMultiAxisLineChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadísticas de Clientes',
      subTitle: options.subTitle ?? 'Top 10 países con más clientes',
    }),
    footer: footerSection,
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
      {
        margin: [0, 20, 0, 0],
        columnGap: 10,
        columns: [
          {
            image: barsChart,
            width: 250,
          },
          // {
          //   image: multiAxisLineChart,
          //   width: 250,
          // },
        ],
      },
    ],
  };
  return docDefinition;
};
