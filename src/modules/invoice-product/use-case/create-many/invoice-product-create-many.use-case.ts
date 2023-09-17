import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceProductDto } from 'src/domain/dtos';
import { CreateManyEntity } from 'src/domain/entities';
import { IInvoiceProductRepository } from 'src/repositories/invoice-product';

@Injectable()
export class InvoiceProductCreateManyUseCase
  implements IBaseUseCase<CreateInvoiceProductDto[], CreateManyEntity>
{
  constructor(
    private readonly invoiceProductRepository: IInvoiceProductRepository,
  ) {}

  execute(data: CreateInvoiceProductDto[]): Promise<CreateManyEntity> {
    return this.invoiceProductRepository.createMany(data);
  }
}
