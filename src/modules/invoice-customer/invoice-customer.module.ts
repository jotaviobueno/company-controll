import { Module } from '@nestjs/common';
import {
  IInvoiceCustomerRepository,
  InvoiceCustomerRepository,
} from 'src/repositories/invoice-customer';
import { InvoiceCustomerCreateUseCase } from './use-cases';

@Module({
  providers: [
    {
      provide: IInvoiceCustomerRepository,
      useClass: InvoiceCustomerRepository,
    },
    InvoiceCustomerCreateUseCase,
  ],
  exports: [InvoiceCustomerCreateUseCase],
})
export class InvoiceCustomerModule {}
