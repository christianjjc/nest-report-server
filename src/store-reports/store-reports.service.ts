import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getOrderTicketById } from 'src/reports/order-ticket-by-id.report';
import { PrinterService } from 'src/printer/printer.service';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('StoreReportService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Store Reports Database Connected');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderByIdReport(orderId: number) {
    const order = await this.orders.findFirst({ where: { order_id: orderId } });
    if (!order) throw new NotFoundException(`Order with id: ${orderId} not found!`);
    const docDefinition = getOrderTicketById();
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }
}
