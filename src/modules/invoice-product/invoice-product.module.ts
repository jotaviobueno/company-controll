import { Module } from '@nestjs/common';
import {
  IInvoiceProductRepository,
  InvoiceProductRepository,
} from 'src/repositories/invoice-product';
import {
  InvoiceProductCreateManyUseCase,
  InvoiceProductFindManyWithInvoicesIdsUseCase,
} from './use-case';
import { PrismaModule } from 'src/db/prisma.module';

export const invoiceProductModuleMock = {
  imports: [PrismaModule],
  providers: [
    InvoiceProductCreateManyUseCase,
    InvoiceProductFindManyWithInvoicesIdsUseCase,
    { provide: IInvoiceProductRepository, useClass: InvoiceProductRepository },
  ],
  exports: [
    InvoiceProductCreateManyUseCase,
    InvoiceProductFindManyWithInvoicesIdsUseCase,
  ],
};

@Module(invoiceProductModuleMock)
export class InvoiceProductModule {}
