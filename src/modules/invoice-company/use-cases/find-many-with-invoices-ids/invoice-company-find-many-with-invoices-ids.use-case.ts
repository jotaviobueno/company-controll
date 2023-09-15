import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { InvoiceCompanyEntity } from 'src/domain/entities';
import { IInvoiceCompanyRepository } from 'src/repositories/invoice-company';

@Injectable()
export class InvoiceCompanyFindManyWithInvoicesIdsUseCase
  implements IBaseUseCase<string[], InvoiceCompanyEntity[]>
{
  constructor(
    private readonly invoiceCompanyRepository: IInvoiceCompanyRepository,
  ) {}

  execute(data: string[]): Promise<InvoiceCompanyEntity[]> {
    return this.invoiceCompanyRepository.findManyWithInvoicesIds(data);
  }
}
