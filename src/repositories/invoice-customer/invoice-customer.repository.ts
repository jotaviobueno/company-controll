import { Injectable } from '@nestjs/common';
import { IInvoiceCustomerRepository } from './iinvoice-customer.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateInvoiceCustomerDto } from 'src/domain/dtos';
import { InvoiceCustomerEntity } from 'src/domain/entities';

@Injectable()
export class InvoiceCustomerRepository
  implements Partial<IInvoiceCustomerRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateInvoiceCustomerDto): Promise<any> {
    return this.prismaService.invoiceCustomer.create({
      data: {
        ...createDto,
      },
    });
  }

  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceCustomerEntity[]> {
    return this.prismaService.invoiceCustomer.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}
