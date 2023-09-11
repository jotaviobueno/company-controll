import { Module, ModuleMetadata } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import {
  InvoicePersonCreateManyUseCase,
  InvoicePersonFindManyWithInvoicesIdsUseCase,
} from './use-cases';
import {
  IInvoicePersonRepository,
  InvoicePersonRepository,
} from 'src/repositories/invoice-person';

export const invoicePersonModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    InvoicePersonCreateManyUseCase,
    InvoicePersonFindManyWithInvoicesIdsUseCase,
    {
      provide: IInvoicePersonRepository,
      useClass: InvoicePersonRepository,
    },
  ],
  exports: [
    InvoicePersonCreateManyUseCase,
    InvoicePersonFindManyWithInvoicesIdsUseCase,
  ],
};

@Module(invoicePersonModuleMock)
export class InvoicePersonModule {}
