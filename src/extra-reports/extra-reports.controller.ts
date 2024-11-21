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
    pdfDoc.info.Title = 'HTML to PDF Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('community-report')
  async getCommunityReport(@Res() response: Response) {
    const pdfDoc = await this.extraReportsService.getCommunity();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Community Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-size')
  getCustomSizeReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCustomSize();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Custom size Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
