import { Module } from '@nestjs/common';
import {
  IInvoiceProductRepository,
  InvoiceProductRepository,
} from 'src/repositories/invoice-product';
import { InvoiceProductCreateManyUseCase } from './use-case';
import { PrismaModule } from 'src/db/prisma.module';

export const invoiceProductModuleMock = {
  imports: [PrismaModule],
  providers: [
    InvoiceProductCreateManyUseCase,
    { provide: IInvoiceProductRepository, useClass: InvoiceProductRepository },
  ],
  exports: [InvoiceProductCreateManyUseCase],
};

@Module(invoiceProductModuleMock)
export class InvoiceProductModule {}
