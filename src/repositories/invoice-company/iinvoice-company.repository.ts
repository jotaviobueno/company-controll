import { IBaseRepository } from 'src/domain/base';
import { CreateInvoiceCompanyDto } from 'src/domain/dtos';
import { InvoiceCompanyEntity } from 'src/domain/entities';

export abstract class IInvoiceCompanyRepository extends IBaseRepository<
  CreateInvoiceCompanyDto,
  InvoiceCompanyEntity
> {}
