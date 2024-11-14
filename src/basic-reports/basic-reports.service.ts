import {
  //
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  //
  getHelloWorldReport,
  getEmploymentLetter,
  getEmploymentLetterById,
  countriesReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('BasicReportsService');

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

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findFirst({ where: { id: employeeId } });
    if (!employee) throw new NotFoundException(`Employee with employeeId: ${employeeId} not found!`);
    const docDefinition = getEmploymentLetterById({
      employerName: 'Christian Jiménez Calvo',
      employerPosition: 'Gerente de RRHHR',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'CJDev SAC',
    });
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }

  async getCountriesReport() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });
    if (!countries) throw new NotFoundException(`Countries not found!`);
    const docDefinition = countriesReport({ countries });
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }
}
