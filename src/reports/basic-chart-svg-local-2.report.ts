// import { TDocumentDefinitions } from 'pdfmake/interfaces';
// import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
// import { ChartConfiguration, ChartType } from 'chart.js';
// import fs from 'fs';

// const svg = fs.readFileSync('./src/assets/ford.svg', 'utf8');

// const generateChartImage = async (): Promise<string> => {
//   const configuration: ChartConfiguration<'bar'> = {
//     type: 'bar',

//     data: {
//       labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
//       datasets: [
//         {
//           label: 'Ventas',
//           data: [65, 59, 80, 81, 56, 55, 40],
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//         },
//       ],
//     },

//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   };

//   const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 450, height: 300 });
//   const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
//   return imageBuffer.toString('base64');
// };

// export const getSvgReport = async (): Promise<TDocumentDefinitions> => {
//   const chart = await generateChartImage();
//   return {
//     defaultStyle: { font: 'Poppins' },
//     content: [
//       {
//         image: 'data:image/png;base64,' + chart,
//       },
//     ],
//   };
// };

/*
 se puede usar directamente la libreria
npm install chartjs-node-canvas

luego preparar la imagen con el grafico
const imageBuffer = await chartJSNodeCanvas.renderToBuffer(tugrafico);    const base64 = imageBuffer.toString('base64');

ya por ultimo para usarlo
image: 'data:image/png;base64,' + chartBase64,

y listo
 */
