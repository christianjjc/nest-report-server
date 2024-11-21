import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = () => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
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
        ],
      },
    ],
  };
  return docDefinition;
};
