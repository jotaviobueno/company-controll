import { Module } from '@nestjs/common';
import { InvoiceCompanyCreateManyUseCase } from './use-cases';
import {
  IInvoiceCompanyRepository,
  InvoiceCompanyRepository,
} from 'src/repositories/invoice-company';
import { PrismaModule } from 'src/db/prisma.module';

export const invoiceCompanyModuleMock = {
  imports: [PrismaModule],
  providers: [
    InvoiceCompanyCreateManyUseCase,
    { provide: IInvoiceCompanyRepository, useClass: InvoiceCompanyRepository },
  ],
  exports: [InvoiceCompanyCreateManyUseCase],
};

@Module(invoiceCompanyModuleMock)
export class InvoiceCompanyModule {}
