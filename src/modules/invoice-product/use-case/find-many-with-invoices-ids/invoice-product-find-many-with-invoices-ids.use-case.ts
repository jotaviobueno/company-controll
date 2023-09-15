import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { InvoiceProductEntity } from 'src/domain/entities';
import { IInvoiceProductRepository } from 'src/repositories/invoice-product';

@Injectable()
export class InvoiceProductFindManyWithInvoicesIdsUseCase
  implements IBaseUseCase<string[], InvoiceProductEntity[]>
{
  constructor(
    private readonly invoiceProductRepository: IInvoiceProductRepository,
  ) {}

  execute(data: string[]): Promise<InvoiceProductEntity[]> {
    return this.invoiceProductRepository.findManyWithInvoicesIds(data);
  }
}
