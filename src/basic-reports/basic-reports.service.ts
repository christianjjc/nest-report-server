import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
}
