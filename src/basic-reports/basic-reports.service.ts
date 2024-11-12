import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, getEmploymentLetter } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Reports Database Connected');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async findAll() {
    const employees = await this.employees.findMany({});
    if (!employees) {
      throw new BadRequestException('No registers on DataBase');
    }
    return employees;
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'Christian Jiménez' });
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetter();
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }
}
