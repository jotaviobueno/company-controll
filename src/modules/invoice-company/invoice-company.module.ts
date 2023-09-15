import { Module } from '@nestjs/common';
import {
  InvoiceCompanyCreateManyUseCase,
  InvoiceCompanyFindManyWithInvoicesIdsUseCase,
} from './use-cases';
import {
  IInvoiceCompanyRepository,
  InvoiceCompanyRepository,
} from 'src/repositories/invoice-company';
import { PrismaModule } from 'src/db/prisma.module';

export const invoiceCompanyModuleMock = {
  imports: [PrismaModule],
  providers: [
    InvoiceCompanyCreateManyUseCase,
    InvoiceCompanyFindManyWithInvoicesIdsUseCase,
    { provide: IInvoiceCompanyRepository, useClass: InvoiceCompanyRepository },
  ],
  exports: [
    InvoiceCompanyCreateManyUseCase,
    InvoiceCompanyFindManyWithInvoicesIdsUseCase,
  ],
};

@Module(invoiceCompanyModuleMock)
export class InvoiceCompanyModule {}
