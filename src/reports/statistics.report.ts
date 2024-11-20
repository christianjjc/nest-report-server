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
        image: donutChart,
        width: 500,
      },
    ],
  };
  return docDefinition;
};
