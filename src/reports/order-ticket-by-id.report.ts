import type { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 30, 0, 0],
  },
};

export const getOrderTicketById = () => {
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    content: [
      //
      {
        text: 'Tucan Code',
        style: 'header',
      },
      {
        columns: [
          //
          {
            text: `15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA \nBN: 12783671823 \nhttps://devtalles.com`,
            alignment: 'left',
            width: '50%',
          },
          {
            text: `Recibo No#: 10255 \nFecha del recibo: 11 de julio de 2021 \nPagar antes de: 18 de mayo de 2024`,
            alignment: 'right',
            width: '50%',
          },
        ],
      },
    ],
  };
  return docDefinition;
};
