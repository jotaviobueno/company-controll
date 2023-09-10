import { IBaseRepository } from 'src/domain/base';
import { CreateInvoiceCustomerDto } from 'src/domain/dtos';
import { InvoiceCustomerEntity } from 'src/domain/entities';

export abstract class IInvoiceCustomerRepository extends IBaseRepository<
  CreateInvoiceCustomerDto,
  InvoiceCustomerEntity
> {}
