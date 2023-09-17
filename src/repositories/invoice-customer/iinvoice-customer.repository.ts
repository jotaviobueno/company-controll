import { InvoiceCustomerEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IInvoiceCustomerRepository extends RepositoryFactory<InvoiceCustomerEntity> {
  constructor() {
    super('invoiceCustomer');
  }

  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceCustomerEntity[]>;
}
