import { IBaseRepository } from 'src/domain/base';
import { CreateInvoicePersonDto } from 'src/domain/dtos';
import { InvoicePersonEntity } from 'src/domain/entities';

export abstract class IInvoicePersonRepository extends IBaseRepository<
  CreateInvoicePersonDto,
  InvoicePersonEntity
> {}
