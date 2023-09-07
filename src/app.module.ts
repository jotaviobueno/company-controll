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
  ],
})
export class AppModule {}
