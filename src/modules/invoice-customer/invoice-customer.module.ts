import { Module } from '@nestjs/common';
import {
  IInvoiceCustomerRepository,
  InvoiceCustomerRepository,
} from 'src/repositories/invoice-customer';
import {
  InvoiceCustomerCreateUseCase,
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
    InvoiceCustomerCreateUseCase,
    InvoiceCustomerFindManyWithInvoicesIdsUseCase,
  ],
  exports: [
    InvoiceCustomerCreateUseCase,
    InvoiceCustomerFindManyWithInvoicesIdsUseCase,
  ],
};

@Module(invoiceCustomerModuleMock)
export class InvoiceCustomerModule {}
