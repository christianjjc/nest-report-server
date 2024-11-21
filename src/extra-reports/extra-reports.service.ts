import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { footerSection, headerSection } from 'src/reports/sections';
import { getCommunityReport } from 'src/reports/community.report';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  async getHtmlToPdf() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf-8');

    // console.log(html);

    const content = getHtmlContent(html, {
      client: 'CJJC Jiménez',
      title: 'Curso NestJS',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'Html to PdfMake',
        subTitle: 'Convertir Html a PDF',
      }),
      footer: footerSection,
      content: ['hola mundo pdfmake', content],
    };

    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }

  async getCommunity() {
    const docDefinition = getCommunityReport();
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }
}
