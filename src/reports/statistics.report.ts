import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getStatisticsReport = () => {
  const docDefinition: TDocumentDefinitions = {
    content: [`Hola Statistics`],
  };
  return docDefinition;
};
