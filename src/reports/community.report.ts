import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = () => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      //* ******* logo - dirección - número de orden
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: 'Forest Admin Community SAP\nRUT: 44.1233\nCamino montaña km 14\nTeléfono: 323.3123.123',
          },
          {
            layout: 'borderBlue',
            alignment: 'right',
            width: 140,
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['No:', '123-456'],
                        ['Fecha:', '2021-09-01'],
                        ['Versión:', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      //* ******* horizontal line
      {
        margin: [0, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 1,
            lineColor: '#3a4546',
          },
        ],
      },
      //* ******* tabla Datos del Cliente
      {
        table: {
          widths: [100, '*', 90, '*'],
          body: [
            [
              {
                text: 'Datos del Cliente',
                fillColor: '#5775e1',
                color: 'white',
                colSpan: 4,
                border: [false, true, false, false],
              },
              {},
              {},
              {},
            ],
            [
              {
                text: 'Razón Social: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
              {
                text: 'Dirección: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
            ],
            [
              {
                text: 'RUT: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
              {
                text: 'Teléfono: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
            ],
            [
              {
                text: 'Giro: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
              {
                text: 'Condición de Pago: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
            ],
            [
              {
                margin: [0, 5],
                text: '',
                fillColor: '#fff',
                color: 'white',
                colSpan: 4,
                border: [false, true, false, false],
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
      //* ******* tabla Datos del PROYECTO
      {
        table: {
          widths: [100, '*', 90, '*'],
          body: [
            [
              {
                text: 'Nombre del Proyecto: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
              {
                text: 'Contacto: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
            ],
            [
              {
                text: 'Dirección: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
              {
                text: 'Email: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
            ],
            [
              {
                text: 'Ciudad: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
              {
                text: 'Teléfono: ',
                fillColor: '#000',
                color: 'white',
              },
              {},
            ],
            [
              {
                margin: [0, 5],
                text: '',
                fillColor: '#fff',
                color: 'white',
                colSpan: 4,
                border: [false, true, false, false],
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
  return docDefinition;
};
