import { InvoiceEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IInvoiceRepository extends RepositoryFactory<InvoiceEntity> {
  constructor() {
    super('invoice');
  }
}
