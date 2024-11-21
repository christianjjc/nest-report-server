import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  async getHtmlToPdfReport(@Res() response: Response) {
    const pdfDoc = await this.extraReportsService.getHtmlToPdf();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola Extra Reports';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
