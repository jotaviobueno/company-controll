import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { InvoicePersonEntity } from 'src/domain/entities';
import { IInvoicePersonRepository } from 'src/repositories/invoice-person';

@Injectable()
export class InvoicePersonFindManyWithInvoicesIdsUseCase
  implements IBaseUseCase<string[], InvoicePersonEntity[]>
{
  constructor(
    private readonly invoicePersonRepository: IInvoicePersonRepository,
  ) {}

  execute(data: string[]): Promise<InvoicePersonEntity[]> {
    return this.invoicePersonRepository.findManyWithInvoicesIds(data);
  }
}
