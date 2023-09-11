import { Injectable } from '@nestjs/common';
import { IInvoiceCompanyRepository } from './iinvoice-company.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateInvoiceCompanyDto } from 'src/domain/dtos';
import { InvoiceCompanyEntity } from 'src/domain/entities';

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

  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceCompanyEntity[]> {
    return this.prismaService.invoiceCompany.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}
