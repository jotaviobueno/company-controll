import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './db/prisma.module';
import { AccessModule } from './modules/access/access.module';
import { GoogleModule } from './modules/google/google.module';
import { PersonModule } from './modules/person/person.module';
import { CompanyModule } from './modules/company/company.module';
import { AddressModule } from './modules/address/address.module';
import { CompanyAddressModule } from './modules/company-address/company-address.module';
import { PersonCompanyModule } from './modules/person-company/person-company.module';
import { PersonRoleModule } from './modules/person-role/person-role.module';
import { PersonAddressModule } from './modules/person-address/person-address.module';
import { ProductModule } from './modules/product/product.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerCompanyModule } from './modules/customer-company/customer-company.module';
import { StockModule } from './modules/stock/stock.module';
import { CustomerAddressModule } from './modules/customer-address/customer-address.module';
import { MercadoPagoModule } from './modules/mercado-pago/mercado-pago.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { FinanceModule } from './modules/finance/finance.module';
import { PaymentModule } from './modules/payment/payment.module';
import { InvoiceProductModule } from './modules/invoice-product/invoice-product.module';
import { InvoiceCompanyModule } from './modules/invoice-company/invoice-company.module';
import { InvoiceCustomerModule } from './modules/invoice-customer/invoice-customer.module';
import { PricingGroupModule } from './modules/pricing-group/pricing-group.module';
import { InvoicePricingGroupModule } from './modules/invoice-pricing-group/invoice-pricing-group.module';
import { InvoicePersonModule } from './modules/invoice-person/invoice-person.module';
import { ProviderModule } from './modules/provider/provider.module';
import { CategoryModule } from './modules/category/category.module';
import { ProviderCategoryModule } from './modules/provider-category/provider-category.module';
import { CompanyProviderModule } from './modules/company-provider/company-provider.module';

@Module({
  imports: [
    GraphqlModule,
    PrismaModule,
    AccessModule,
    GoogleModule,
    PersonModule,
    AddressModule,
    CompanyModule,
    PersonCompanyModule,
    PersonRoleModule,
    CompanyAddressModule,
    PersonAddressModule,
    ProductModule,
    CustomerModule,
    CustomerCompanyModule,
    StockModule,
    CustomerAddressModule,
    MercadoPagoModule,
    InvoiceModule,
    FinanceModule,
    PaymentModule,
    InvoiceProductModule,
    InvoiceCompanyModule,
    InvoiceCustomerModule,
    PricingGroupModule,
    InvoicePricingGroupModule,
    InvoicePersonModule,
    ProviderModule,
    CategoryModule,
    ProviderCategoryModule,
    CompanyProviderModule,
  ],
})
export class AppModule {}
