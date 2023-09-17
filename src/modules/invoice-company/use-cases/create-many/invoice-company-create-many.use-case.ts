import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceCompanyDto } from 'src/domain/dtos';
import { CreateManyEntity } from 'src/domain/entities';
import { IInvoiceCompanyRepository } from 'src/repositories/invoice-company';

@Injectable()
export class InvoiceCompanyCreateManyUseCase
  implements IBaseUseCase<CreateInvoiceCompanyDto[], CreateManyEntity>
{
  constructor(
    private readonly invoiceCompanyRepository: IInvoiceCompanyRepository,
  ) {}

  execute(data: CreateInvoiceCompanyDto[]): Promise<CreateManyEntity> {
    return this.invoiceCompanyRepository.createMany(data);
  }
}
