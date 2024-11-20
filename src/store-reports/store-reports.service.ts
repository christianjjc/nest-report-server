import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getOrderTicketById } from 'src/reports/order-ticket-by-id.report';
import { PrinterService } from 'src/printer/printer.service';
import { getBasicChartSvgReport, getStatisticsReport } from 'src/reports';

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
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });
    if (!order) throw new NotFoundException(`Order with id: ${orderId} not found!`);
    //console.log(JSON.stringify(order, null, 2));
    // const docDefinition = getOrderTicketById({ data: order as any });
    const docDefinition = getOrderTicketById({ data: order });
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }

  async getSvgChart() {
    const docDefinition = await getBasicChartSvgReport();
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }

  async getStatisticsChart() {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    // console.log('topCountries', topCountries);

    const topCountryData = topCountries.map(({ country, _count }) => ({
      country: country,
      customers: _count,
    }));

    const docDefinition = await getStatisticsReport({
      topCountries: topCountryData,
    });
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }
}
