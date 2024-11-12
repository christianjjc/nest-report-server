import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import PdfPrinter from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-BoldItalic.ttf',
  },
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Reports Database Connected');
  }

  async findAll() {
    const employees = await this.employees.findMany({});
    if (!employees) {
      throw new BadRequestException('No registers on DataBase');
    }
    return employees;
  }

  hello() {
    const printer = new PdfPrinter(fonts);

    const docDefinition: TDocumentDefinitions = {
      content: ['Hola Mundo'],
    };

    const doc = printer.createPdfKitDocument(docDefinition);

    return doc;
  }
}
