import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getOrderByIdReport(@Param('orderId') orderId: string, @Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(+orderId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Store-Report.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
