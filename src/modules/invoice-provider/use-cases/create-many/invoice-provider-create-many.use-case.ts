import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceProviderInput } from 'src/domain/dtos';
import { IInvoiceProviderRepository } from 'src/repositories/invoice-provider';

@Injectable()
export class InvoiceProviderCreateManyUseCase
  implements IBaseUseCase<CreateInvoiceProviderInput[], void>
{
  constructor(
    private readonly invoiceProviderRepository: IInvoiceProviderRepository,
  ) {}

  execute(data: CreateInvoiceProviderInput[]): Promise<void> {
    return this.invoiceProviderRepository.createMany(data);
  }
}
