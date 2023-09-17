import { Injectable } from '@nestjs/common';
import { InvoiceProviderEntity } from 'src/domain/entities';
import { IInvoiceProviderRepository } from './iinvoice-provider.repository';

@Injectable()
export class InvoiceProviderRepository extends IInvoiceProviderRepository {
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
