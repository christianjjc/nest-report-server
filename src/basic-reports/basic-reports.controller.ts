import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get('get-all')
  async findAll() {
    return await this.basicReportsService.findAll();
  }

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Constancia-de-Empleado.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
