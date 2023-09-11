import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceCustomerDto } from 'src/domain/dtos';
import { InvoiceCustomerEntity } from 'src/domain/entities';
import { IInvoiceCustomerRepository } from 'src/repositories/invoice-customer';

@Injectable()
export class InvoiceCustomerCreateUseCase
  implements IBaseUseCase<CreateInvoiceCustomerDto[], InvoiceCustomerEntity[]>
{
  constructor(
    private readonly invoiceCustomerRepository: IInvoiceCustomerRepository,
  ) {}

  execute(data: CreateInvoiceCustomerDto[]): Promise<InvoiceCustomerEntity[]> {
    return this.invoiceCustomerRepository.createMany(data);
  }
}
