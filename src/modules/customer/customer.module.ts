import { Module, ModuleMetadata } from '@nestjs/common';
import { CustomerResolver } from './customer.resolver';
import {
  CustomerCreateUseCase,
  CustomerFindAllUseCase,
  CustomerFindByCpfUseCase,
  CustomerFindOneUseCase,
  CustomerSimpleCreateUseCase,
  CustomerSoftDeleteUseCase,
  CustomerUpdateUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import {
  CustomerRepository,
  ICustomerRepository,
} from 'src/repositories/customer';

// TODO: Refazer os testes nesse module

export const customerModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    CustomerResolver,
    CustomerCreateUseCase,
    CustomerFindAllUseCase,
    CustomerFindOneUseCase,
    CustomerUpdateUseCase,
    CustomerSoftDeleteUseCase,
    CustomerFindByCpfUseCase,
    CustomerSimpleCreateUseCase,
    { provide: ICustomerRepository, useClass: CustomerRepository },
  ],
  exports: [
    CustomerSimpleCreateUseCase,
    CustomerFindOneUseCase,
    CustomerFindByCpfUseCase,
  ],
};

@Module(customerModuleMock)
export class CustomerModule {}
