import { Module, ModuleMetadata } from '@nestjs/common';
import { InvoiceResolver } from './invoice.resolver';
import {
  IInvoiceRepository,
  InvoiceRepository,
} from 'src/repositories/invoice';
import {
  InvoiceCalculatorUseCase,
  InvoiceCreateUseCase,
  InvoiceFindAllUseCase,
  InvoiceFindOneUseCase,
  InvoiceHandlerUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import { CompanyModule } from '../company/company.module';
import { PersonModule } from '../person/person.module';
import { CustomerModule } from '../customer/customer.module';
import { FinanceModule } from '../finance/finance.module';

export const invoiceModuleMock: ModuleMetadata = {
  imports: [
    PrismaModule,
    CompanyModule,
    PersonModule,
    CustomerModule,
    FinanceModule,
  ],
  providers: [
    InvoiceResolver,
    InvoiceCreateUseCase,
    InvoiceFindAllUseCase,
    InvoiceFindOneUseCase,
    InvoiceCalculatorUseCase,
    InvoiceHandlerUseCase,
    { provide: IInvoiceRepository, useClass: InvoiceRepository },
  ],
  exports: [
    InvoiceHandlerUseCase,
    InvoiceCreateUseCase,
    InvoiceFindOneUseCase,
    InvoiceCalculatorUseCase,
  ],
};

@Module(invoiceModuleMock)
export class InvoiceModule {}
