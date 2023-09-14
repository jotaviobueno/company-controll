import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceCompanyDto } from 'src/domain/dtos';
import { IInvoiceCompanyRepository } from 'src/repositories/invoice-company';

@Injectable()
export class InvoiceCompanyCreateManyUseCase
  implements IBaseUseCase<CreateInvoiceCompanyDto[], void>
{
  constructor(
    private readonly invoiceCompanyRepository: IInvoiceCompanyRepository,
  ) {}

  execute(data: CreateInvoiceCompanyDto[]): Promise<void> {
    return this.invoiceCompanyRepository.createMany(data);
  }
}
