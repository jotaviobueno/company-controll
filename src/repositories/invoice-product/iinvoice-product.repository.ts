import { IBaseRepository } from 'src/domain/base';
import { CreateInvoiceProductDto } from 'src/domain/dtos';
import { InvoiceProductEntity } from 'src/domain/entities';

export abstract class IInvoiceProductRepository extends IBaseRepository<
  CreateInvoiceProductDto,
  InvoiceProductEntity
> {
  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceProductEntity[]>;
}
