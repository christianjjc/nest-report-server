import type { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection } from './sections';

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
  subHeader: {
    fontSize: 14,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export const getOrderTicketById = () => {
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      //* Header
      {
        text: 'Tucan Code',
        style: 'header',
      },

      //* Address
      {
        columns: [
          //
          {
            text: `15 Montgomery Str, Suite 100,\nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://cjjc.pe`,
            alignment: 'left',
            width: '50%',
          },
          {
            text: [
              //
              { text: 'Recibo No#: 10255\n', bold: true },
              `Fecha del recibo: 11 de julio de 2021\nPagar antes de: 18 de mayo de 2024`,
            ],
            alignment: 'right',
            width: '50%',
          },
        ],
      },

      //* QR Code
      // basic usage
      // { qr: 'https://cjjc.pe' },
      // //* colored QR
      // { qr: 'text in QR', foreground: 'red', background: 'yellow' },
      // //* resized QR
      { qr: 'https://cjjc.pe', fit: 100, alignment: 'right' },

      //* Dirección del cliente
      {
        text: [
          //
          { text: `Cobrar a:\n`, bold: true },
          `Razón Social: Richter Supermarkt\nMichael Holz\nGrenzacherweg 237`,
        ],
      },
    ],
  };
  return docDefinition;
};

/*
Properties:
qr: string - text in QR code
foreground: string (optional, default black) - foreground color
background: string (optional, default white) - background color
fit: integer (optional) - fit the output QR image
version: integer (optional) - QR version range from 1 to 40 (for details see wikipedia.org
eccLevel: string (optional, default L) - error correction capability (for details see wikipedia.org), possible values:
L - Level L (Low), approx 7% of codewords can be restored
M - Level M (Medium), approx 15% of codewords can be restored
Q - Level Q (Quartile), approx 25% of codewords can be restored
H - Level H (High), approx 30% of codewords can be restored
mode: string (optional) - encoding mode, possible values: numeric, alphanumeric, octet (for details see wikipedia.org)
mask: integer (optional) - mask pattern, range from 0 to 7 (for details see wikipedia.org)
 */
