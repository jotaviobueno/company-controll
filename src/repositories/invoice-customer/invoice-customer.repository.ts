import { Injectable } from '@nestjs/common';
import { IInvoiceCustomerRepository } from './iinvoice-customer.repository';
import { InvoiceCustomerEntity } from 'src/domain/entities';

@Injectable()
export class InvoiceCustomerRepository extends IInvoiceCustomerRepository {
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
