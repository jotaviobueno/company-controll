import { Module, ModuleMetadata } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { InvoicePersonCreateManyUseCase } from './use-cases';
import {
  IInvoicePersonRepository,
  InvoicePersonRepository,
} from 'src/repositories/invoice-person';

export const invoicePersonModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    InvoicePersonCreateManyUseCase,
    {
      provide: IInvoicePersonRepository,
      useClass: InvoicePersonRepository,
    },
  ],
  exports: [InvoicePersonCreateManyUseCase],
};

@Module(invoicePersonModuleMock)
export class InvoicePersonModule {}
