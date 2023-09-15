import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { InvoiceEntity } from 'src/domain/entities';
import { IInvoiceRepository } from 'src/repositories/invoice';

@Injectable()
export class InvoiceFindManyWithInvoicesIdsUseCase
  implements IBaseUseCase<string[], InvoiceEntity[]>
{
  constructor(private readonly invoiceRepository: IInvoiceRepository) {}

  execute(data: string[]): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.findManyWithIds(data);
  }
}
