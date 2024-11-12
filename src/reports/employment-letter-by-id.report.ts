import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections';
import { DateFormatter } from 'src/helpers';

interface ReportValues {
  employerName?: string;
  employerPosition?: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany?: string;
}

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    margin: [0, 0, 0, 70],
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
    // margin: [0, 3, 0, 0],
    // alignment: 'center',
  },

  // signatureSection: {
  //   margin: [0, 150, 0, 50],
  //   alignment: 'center',
  // },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

export const getEmploymentLetterById = (values: ReportValues): TDocumentDefinitions => {
  const {
    //
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;

  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({
      title: 'Constancia de Empleo',
      showLogo: true,
      showDate: true,
    }),
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany},
por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra
empresa desde el ${DateFormatter.getDDMMMMYYYY(employeeStartDate)}.\n\n
Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus
labores.\n\n
La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas
semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y
procedimientos establecidos por la empresa.\n\n
Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
        style: 'body',
      },

      { text: `Atentamente,`, style: 'signature' },
      { text: `${employerName}`, style: 'signature' },
      { text: `${employerPosition}`, style: 'signature' },
      { text: `${employerCompany}`, style: 'signature' },
      { text: DateFormatter.getDDMMMMYYYY(new Date()), style: 'signature' },
    ],
    footer: {
      text: `Este documento es una constancia de empleo y no representa un compromiso laboral`,
      style: 'footer',
    },
  };

  return docDefinition;
};

/**
 * Esta copia tiene la opción para colocar una línea en el campo de firma.
 * @param values Report Values
 * @returns docDefinition
 */
export const getEmploymentLetterById2 = (values: ReportValues) => {
  const {
    //
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;

  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      font: 'Poppins',
    },
    header: headerSection({ showLogo: true }),
    styles: styles,
    pageMargins: [40, 40, 40, 40],
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYYY(employeeStartDate)}. \n
              Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n
              La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa. \n
              Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      {
        columns: [
          {
            width: '50%',
            stack: [
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }] },
              { text: employerName, style: 'signature' },
              { text: employerPosition, style: { fontSize: 13 } },
            ],
            style: 'signatureSection',
          },
          {
            width: '50%',
            stack: [
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }] },
              { text: employeeName, style: 'signature' },
              { text: employeePosition, style: { fontSize: 13 } },
            ],
            style: 'signatureSection',
          },
        ],
      },
    ],
    footer: { text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.', style: 'footer' },
  };

  return docDefinition;
};
