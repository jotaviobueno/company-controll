import { Module } from '@nestjs/common';
import {
  IInvoiceProductRepository,
  InvoiceProductRepository,
} from 'src/repositories/invoice-product';
import { InvoiceProductCreateManyUseCase } from './use-case';

@Module({
  providers: [
    InvoiceProductCreateManyUseCase,
    { provide: IInvoiceProductRepository, useClass: InvoiceProductRepository },
  ],
  exports: [InvoiceProductCreateManyUseCase],
})
export class InvoiceProductModule {}
