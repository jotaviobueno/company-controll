import { Module } from '@nestjs/common';
import {
  IInvoiceCustomerRepository,
  InvoiceCustomerRepository,
} from 'src/repositories/invoice-customer';
import { InvoiceCustomerCreateUseCase } from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';

// TODO: Criar testes nesse module

export const invoiceCustomerModuleMock = {
  imports: [PrismaModule],
  providers: [
    {
      provide: IInvoiceCustomerRepository,
      useClass: InvoiceCustomerRepository,
    },
    InvoiceCustomerCreateUseCase,
  ],
  exports: [InvoiceCustomerCreateUseCase],
};

@Module(invoiceCustomerModuleMock)
export class InvoiceCustomerModule {}
