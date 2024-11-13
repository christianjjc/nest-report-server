import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, headerSection } from './sections';
import { countries as Country } from '@prisma/client';

interface ReportOptionsI {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const countriesReport = (options: ReportOptionsI): TDocumentDefinitions => {
  const { countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: 'Countries Reports',
      subTitle: 'List of Countries',
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'lightHorizontalLines', //noBorders - headerLineOnly - lightHorizontalLines
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            ['id', 'Iso2', 'Iso3', 'Name', 'Continent', 'LocalName'], //cabecera
            ...countries.map((item) => [
              { text: item.id.toString() },
              { text: item.iso2 },
              { text: item.iso3 },
              { text: item.name, bold: true },
              { text: item.continent },
              { text: item.local_name },
            ]),
          ],
        },
      },
      // tabla de totales
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
        },
        margin: [0, 40, 0, 0],
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            [
              {
                //
                text: 'Total de países',
                colSpan: 2,
                bold: true,
              },
              {},
              {
                //
                text: `${countries.length.toString()} países.`,
                bold: true,
              },
              {},
              {},
              {},
            ], //cabecera
          ],
        },
      },
    ],
  };
};
