import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { InvoiceCustomerEntity } from 'src/domain/entities';
import { IInvoiceCustomerRepository } from 'src/repositories/invoice-customer';

@Injectable()
export class InvoiceCustomerFindManyWithInvoicesIdsUseCase
  implements IBaseUseCase<string[], InvoiceCustomerEntity[]>
{
  constructor(
    private readonly invoiceCustomerRepository: IInvoiceCustomerRepository,
  ) {}

  execute(data: string[]): Promise<InvoiceCustomerEntity[]> {
    return this.invoiceCustomerRepository.findManyWithInvoicesIds(data);
  }
}
