import { Module, ModuleMetadata } from '@nestjs/common';
import { CustomerAddressResolver } from './customer-address.resolver';
import {
  CustomerAddressCreateUseCase,
  CustomerAddressFindAllUseCase,
  CustomerAddressFindOneUseCase,
  CustomerAddressSoftDeleteUseCase,
  CustomerAddressUpdateUseCase,
} from './use-cases';
import {
  CustomerAddressRepository,
  ICustomerAddressRepostiroy,
} from 'src/repositories/customer-address';
import { CustomerModule } from '../customer/customer.module';
import { AddressModule } from '../address/address.module';
import { PrismaModule } from 'src/db/prisma.module';

export const customerAddressModuleMock: ModuleMetadata = {
  imports: [CustomerModule, AddressModule, PrismaModule],
  providers: [
    CustomerAddressResolver,
    CustomerAddressCreateUseCase,
    CustomerAddressFindAllUseCase,
    CustomerAddressFindOneUseCase,
    CustomerAddressSoftDeleteUseCase,
    CustomerAddressUpdateUseCase,
    {
      provide: ICustomerAddressRepostiroy,
      useClass: CustomerAddressRepository,
    },
  ],
};

@Module(customerAddressModuleMock)
export class CustomerAddressModule {}
