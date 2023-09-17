import { InvoiceEntity, InvoiceProviderEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IInvoiceProviderRepository extends RepositoryFactory<InvoiceEntity> {
  constructor() {
    super('invoice');
  }

  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceProviderEntity[]>;
}
