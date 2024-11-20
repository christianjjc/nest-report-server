// import { TDocumentDefinitions } from 'pdfmake/interfaces'; // Asegúrate de importar el tipo correcto
// import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

// const width = 800; // ancho del canvasconst
// const height = 600; // alto del canvas
// const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

// async function chartsJsToImage(chartConfig: any): Promise<Buffer> {
//   return chartJSNodeCanvas.renderToBuffer(chartConfig);
// }

// export const getBasicChartReport = async (): Promise<TDocumentDefinitions> => {
//   const chartConfig = {
//     type: 'bar',
//     data: {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//         {
//           label: 'My First Dataset',
//           data: [65, 59, 80, 81, 56, 55, 40],
//           backgroundColor: 'rgba(93, 75, 192, 0.2)', // Corregido
//           borderColor: 'rgb(81, 75, 192)',
//         },
//       ],
//     },
//   };
//   const chartImageBuffer = await chartsJsToImage(chartConfig);
//   const chartImageBase64 = Buffer.from(chartImageBuffer).toString('base64');
//   // Crear el documento PDF usando el gráfico generado    const documentDefinition: TDocumentDefinitions = {        content: [            {                image: `data:image/png;base64,${chartImageBase64}`,                width: 500            }        ]    };
//   return documentDefinition;
// };
