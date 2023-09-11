import { Module, ModuleMetadata } from '@nestjs/common';
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
import { InvoiceCompanyModule } from '../invoice-company/invoice-company.module';
import {
  LoaderCompanyByInvoiceId,
  LoaderCustomerByInvoiceId,
} from './dataloders';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceCustomerModule } from '../invoice-customer/invoice-customer.module';

// TODO: Criar testes nesse module

export const invoiceModuleMock: ModuleMetadata = {
  imports: [
    PrismaModule,
    CompanyModule,
    PersonModule,
    CustomerModule,
    FinanceModule,
    InvoiceCompanyModule,
    InvoiceCustomerModule,
  ],
  providers: [
    InvoiceResolver,
    InvoiceCreateUseCase,
    InvoiceFindAllUseCase,
    InvoiceFindOneUseCase,
    InvoiceCalculatorUseCase,
    InvoiceHandlerUseCase,
    LoaderCompanyByInvoiceId,
    LoaderCustomerByInvoiceId,
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
