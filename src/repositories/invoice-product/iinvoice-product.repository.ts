import { InvoiceProductEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IInvoiceProductRepository extends RepositoryFactory<InvoiceProductEntity> {
  constructor() {
    super('invoiceProduct');
  }

  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceProductEntity[]>;
}
