import { Module, ModuleMetadata } from '@nestjs/common';
import {
  InvoiceProviderCreateManyUseCase,
  InvoiceProviderFindManyWithInvoicesIdsUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import {
  IInvoiceProviderRepository,
  InvoiceProviderRepository,
} from 'src/repositories/invoice-provider';

export const invoiceProviderModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    InvoiceProviderCreateManyUseCase,
    InvoiceProviderFindManyWithInvoicesIdsUseCase,
    {
      provide: IInvoiceProviderRepository,
      useClass: InvoiceProviderRepository,
    },
  ],
  exports: [
    InvoiceProviderCreateManyUseCase,
    InvoiceProviderFindManyWithInvoicesIdsUseCase,
  ],
};

@Module(invoiceProviderModuleMock)
export class InvoiceProviderModule {}
