import { Module, ModuleMetadata } from '@nestjs/common';
import { CustomerCompanyResolver } from './customer-company.resolver';
import {
  CustomerCompanyCreateUseCase,
  CustomerCompanyRemoveUseCase,
} from './use-cases';
import { CustomerModule } from '../customer/customer.module';
import { CompanyModule } from '../company/company.module';
import { PrismaModule } from 'src/db/prisma.module';
import {
  CustomerCompanyRepository,
  ICustomerCompanyRepository,
} from 'src/repositories/customer-company';

export const customerCompanyModuleMock: ModuleMetadata = {
  imports: [CustomerModule, CompanyModule, PrismaModule],
  providers: [
    CustomerCompanyResolver,
    CustomerCompanyCreateUseCase,
    CustomerCompanyRemoveUseCase,
    {
      provide: ICustomerCompanyRepository,
      useClass: CustomerCompanyRepository,
    },
  ],
};

@Module(customerCompanyModuleMock)
export class CustomerCompanyModule {}
