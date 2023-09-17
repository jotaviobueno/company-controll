import { InvoicePricingGroupEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IInvoicePricingGroupRepository extends RepositoryFactory<InvoicePricingGroupEntity> {
  constructor() {
    super('invoicePricingGroup');
  }

  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoicePricingGroupEntity[]>;
}
