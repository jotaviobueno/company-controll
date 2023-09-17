import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceCustomerDto } from 'src/domain/dtos';
import { CreateManyEntity } from 'src/domain/entities';
import { IInvoiceCustomerRepository } from 'src/repositories/invoice-customer';

@Injectable()
export class InvoiceCustomerCreateManyUseCase
  implements IBaseUseCase<CreateInvoiceCustomerDto[], CreateManyEntity>
{
  constructor(
    private readonly invoiceCustomerRepository: IInvoiceCustomerRepository,
  ) {}

  execute(data: CreateInvoiceCustomerDto[]): Promise<CreateManyEntity> {
    return this.invoiceCustomerRepository.createMany(data);
  }
}
