import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceProviderInput } from 'src/domain/dtos';
import { CreateManyEntity } from 'src/domain/entities';
import { IInvoiceProviderRepository } from 'src/repositories/invoice-provider';

@Injectable()
export class InvoiceProviderCreateManyUseCase
  implements IBaseUseCase<CreateInvoiceProviderInput[], CreateManyEntity>
{
  constructor(
    private readonly invoiceProviderRepository: IInvoiceProviderRepository,
  ) {}

  execute(data: CreateInvoiceProviderInput[]): Promise<CreateManyEntity> {
    return this.invoiceProviderRepository.createMany(data);
  }
}
