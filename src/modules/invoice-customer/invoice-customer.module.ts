import { Module } from '@nestjs/common';
import {
  IInvoiceCustomerRepository,
  InvoiceCustomerRepository,
} from 'src/repositories/invoice-customer';
import {
  InvoiceCustomerCreateManyUseCase,
  InvoiceCustomerFindManyWithInvoicesIdsUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';

export const invoiceCustomerModuleMock = {
  imports: [PrismaModule],
  providers: [
    {
      provide: IInvoiceCustomerRepository,
      useClass: InvoiceCustomerRepository,
    },
    InvoiceCustomerCreateManyUseCase,
    InvoiceCustomerFindManyWithInvoicesIdsUseCase,
  ],
  exports: [
    InvoiceCustomerCreateManyUseCase,
    InvoiceCustomerFindManyWithInvoicesIdsUseCase,
  ],
};

@Module(invoiceCustomerModuleMock)
export class InvoiceCustomerModule {}
