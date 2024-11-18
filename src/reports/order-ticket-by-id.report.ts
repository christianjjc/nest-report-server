import type { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection } from './sections';
import { CurrencyFormatter, DateFormatter, DecimalFormatter } from 'src/helpers';
import { CompleteOrderI } from 'src/interfaces/order-details.interface';

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

interface ReportValuesI {
  title?: string;
  subTitle?: string;
  data: CompleteOrderI;
}

export const getOrderTicketById = (value: ReportValuesI): TDocumentDefinitions => {
  const { data } = value;
  // console.log(JSON.stringify(data, null, 2));
  const { customers, order_details } = data;

  const subTotal = order_details.reduce(
    (acc, detail) =>
      //
      acc + detail.quantity * +detail.products.price,
    0,
  );

  const iva_ = subTotal * 1.15 - subTotal;

  const total = subTotal * 1.15;

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
              { text: `Recibo No#: ${data.order_id}\n`, bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(data.order_date)}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}`,
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
          `Razón Social: ${customers.customer_name}\n${customers.contact_name}\n${customers.address}\n${customers.city}, ${customers.country}`,
        ],
      },

      //* Tabla con el detalle de la orden
      {
        layout: 'headerInLineOnly',
        margin: [0, 20, 0, 0],
        table: {
          headerRows: 1,
          widths: [20, '*', 'auto', 60, 60],
          body: [
            [
              //cabecera
              { text: 'Id', color: '#000', bold: true /* , margin: [5, 5]  */, alignment: 'center', margin: [0, 4] },
              { text: 'Descripción', color: '#000', bold: true, alignment: 'center', margin: [0, 4] },
              { text: 'Cantidad', color: '#000', bold: true, alignment: 'center', margin: [0, 4] },
              { text: 'Precio', color: '#000', bold: true, alignment: 'center', margin: [0, 4] },
              { text: 'Total', color: '#000', bold: true, alignment: 'center', margin: [0, 4] },
            ],
            // data
            ...order_details.map((item) => [
              { text: item.order_detail_id, alignment: 'center', fontSize: 11, margin: [0, 2] },
              { text: item.products.product_name, alignment: 'left', fontSize: 11, margin: [0, 2] },
              { text: DecimalFormatter.getDecimalFormat(item.quantity), alignment: 'right', fontSize: 11, margin: [0, 2] },
              { text: CurrencyFormatter.getCurrencyFormat(+item.products.price), alignment: 'right', fontSize: 11, margin: [0, 2] },
              {
                text: CurrencyFormatter.getCurrencyFormat(+item.products.price * +item.quantity),
                alignment: 'right',
                fontSize: 11,
                margin: [0, 2],
              },
            ]),
          ],
        },
      },
      '\n',
      //* tabla Totales
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  { text: 'Subtotal:', bold: true },
                  {
                    text: CurrencyFormatter.getCurrencyFormat(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'IVA (15%):', bold: true },
                  {
                    text: CurrencyFormatter.getCurrencyFormat(iva_),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total:', bold: true },
                  {
                    text: CurrencyFormatter.getCurrencyFormat(total),
                    alignment: 'right',
                  },
                ],
              ],
            },
          },
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
