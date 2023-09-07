import { Module, ModuleMetadata } from '@nestjs/common';
import { CustomerResolver } from './customer.resolver';
import {
  CustomerCreateUseCase,
  CustomerFindAllUseCase,
  CustomerFindOneUseCase,
  CustomerSoftDeleteUseCase,
  CustomerUpdateUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import { CompanyModule } from '../company/company.module';
import {
  CustomerRepository,
  ICustomerRepository,
} from 'src/repositories/customer';

export const customerModuleMock: ModuleMetadata = {
  imports: [PrismaModule, CompanyModule],
  providers: [
    CustomerResolver,
    CustomerCreateUseCase,
    CustomerFindAllUseCase,
    CustomerFindOneUseCase,
    CustomerUpdateUseCase,
    CustomerSoftDeleteUseCase,
    { provide: ICustomerRepository, useClass: CustomerRepository },
  ],
  exports: [CustomerCreateUseCase, CustomerFindOneUseCase],
};

@Module(customerModuleMock)
export class CustomerModule {}
