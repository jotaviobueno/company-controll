import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { InvoiceProviderEntity } from 'src/domain/entities';
import { IInvoiceProviderRepository } from 'src/repositories/invoice-provider';

@Injectable()
export class InvoiceProviderFindManyWithInvoicesIdsUseCase
  implements IBaseUseCase<string[], InvoiceProviderEntity[]>
{
  constructor(
    private readonly invoiceProviderRepository: IInvoiceProviderRepository,
  ) {}

  execute(data: string[]): Promise<InvoiceProviderEntity[]> {
    return this.invoiceProviderRepository.findManyWithInvoicesIds(data);
  }
}
