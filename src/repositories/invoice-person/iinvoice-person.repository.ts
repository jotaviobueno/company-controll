import { InvoicePersonEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IInvoicePersonRepository extends RepositoryFactory<InvoicePersonEntity> {
  constructor() {
    super('invoicePerson');
  }

  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoicePersonEntity[]>;
}
