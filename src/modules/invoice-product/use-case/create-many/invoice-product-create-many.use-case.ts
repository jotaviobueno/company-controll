import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceProductDto } from 'src/domain/dtos';
import { IInvoiceProductRepository } from 'src/repositories/invoice-product';

@Injectable()
export class InvoiceProductCreateManyUseCase
  implements IBaseUseCase<CreateInvoiceProductDto[], void>
{
  constructor(
    private readonly invoiceProductRepository: IInvoiceProductRepository,
  ) {}

  execute(data: CreateInvoiceProductDto[]): Promise<void> {
    return this.invoiceProductRepository.createMany(data);
  }
}
