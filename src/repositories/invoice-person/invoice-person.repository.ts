import { IInvoicePersonRepository } from './iinvoice-person.repository';
import { Injectable } from '@nestjs/common';
import { InvoicePersonEntity } from 'src/domain/entities';

@Injectable()
export class InvoicePersonRepository extends IInvoicePersonRepository {
  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoicePersonEntity[]> {
    return this.prismaService.invoicePerson.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}
