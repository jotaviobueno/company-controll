import { IBaseRepository } from 'src/domain/base';
import { CreateInvoiceInput } from 'src/domain/dtos';
import { InvoiceEntity } from 'src/domain/entities';

export abstract class IInvoiceRepository extends IBaseRepository<
  CreateInvoiceInput,
  InvoiceEntity
> {}
