import { Module } from '@nestjs/common';
import { InvoiceCompanyCreateManyUseCase } from './use-cases';
import {
  IInvoiceCompanyRepository,
  InvoiceCompanyRepository,
} from 'src/repositories/invoice-company';

@Module({
  providers: [
    InvoiceCompanyCreateManyUseCase,
    { provide: IInvoiceCompanyRepository, useClass: InvoiceCompanyRepository },
  ],
  exports: [InvoiceCompanyCreateManyUseCase],
})
export class InvoiceCompanyModule {}
