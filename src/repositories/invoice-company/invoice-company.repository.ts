import { Injectable } from '@nestjs/common';
import { IInvoiceCompanyRepository } from './iinvoice-company.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateInvoiceCompanyDto } from 'src/domain/dtos';

@Injectable()
export class InvoiceCompanyRepository
  implements Partial<IInvoiceCompanyRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  createMany(createDto: CreateInvoiceCompanyDto[]): Promise<any> {
    return this.prismaService.invoiceCompany.createMany({
      data: createDto,
    });
  }
}
