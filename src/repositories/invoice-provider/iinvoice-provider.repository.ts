import { IBaseRepository } from 'src/domain/base';
import { CreateInvoiceProviderInput } from 'src/domain/dtos';
import { InvoiceProviderEntity } from 'src/domain/entities';

export abstract class IInvoiceProviderRepository extends IBaseRepository<
  CreateInvoiceProviderInput,
  InvoiceProviderEntity
> {
  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceProviderEntity[]>;
}
