import { InvoiceCompanyEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IInvoiceCompanyRepository extends RepositoryFactory<InvoiceCompanyEntity> {
  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceCompanyEntity[]>;
}
