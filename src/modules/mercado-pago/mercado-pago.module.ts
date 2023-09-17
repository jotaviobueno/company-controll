import { Module, ModuleMetadata } from '@nestjs/common';
import { MercadoPagoController } from './mercado-pago.controller';
import { MercadoPago } from 'src/domain/utils';
import { PaymentNotificationModule } from '../payment-notification/payment-notification.module';
import {
  MercadoPagoHandlerUseCase,
  MercadoPagoPaymentUseCase,
  MercadoPagoPreferencesUseCase,
} from './use-cases';
import { InvoiceModule } from '../invoice/invoice.module';
import { PrismaModule } from 'src/db/prisma.module';
import { PaymentModule } from '../payment/payment.module';
import { ProductModule } from '../product/product.module';
import { CustomerModule } from '../customer/customer.module';
import { InvoiceProductModule } from '../invoice-product/invoice-product.module';
import { InvoiceCompanyModule } from '../invoice-company/invoice-company.module';
import { InvoiceCustomerModule } from '../invoice-customer/invoice-customer.module';
import { CustomerCompanyModule } from '../customer-company/customer-company.module';
import { StockModule } from '../stock/stock.module';

export const mercadoPagoModuleMock: ModuleMetadata = {
  imports: [
    PaymentNotificationModule,
    InvoiceModule,
    PrismaModule,
    PaymentModule,
    ProductModule,
    CustomerModule,
    CustomerCompanyModule,
    InvoiceProductModule,
    InvoiceCompanyModule,
    InvoiceCustomerModule,
    StockModule,
  ],
  controllers: [MercadoPagoController],
  providers: [
    MercadoPago,
    MercadoPagoPreferencesUseCase,
    MercadoPagoPaymentUseCase,
    MercadoPagoHandlerUseCase,
  ],
};

@Module(mercadoPagoModuleMock)
export class MercadoPagoModule {}
