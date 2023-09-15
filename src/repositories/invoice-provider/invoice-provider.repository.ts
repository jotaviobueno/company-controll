import { Injectable } from '@nestjs/common';
import { IInvoiceProviderRepository } from './iinvoice-provider.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateInvoiceProviderInput } from 'src/domain/dtos';
import { InvoiceProviderEntity } from 'src/domain/entities';

@Injectable()
export class InvoiceProviderRepository
  implements Partial<IInvoiceProviderRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  createMany(createDto: CreateInvoiceProviderInput[]): Promise<any> {
    return this.prismaService.invoiceProvider.createMany({ data: createDto });
  }

  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceProviderEntity[]> {
    return this.prismaService.invoiceProvider.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}
