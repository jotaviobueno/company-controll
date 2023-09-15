import { Module, ModuleMetadata } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { ProviderModule } from '../provider/provider.module';
import { AddressModule } from '../address/address.module';
import {
  IProviderAddressRepository,
  ProviderAddressRepository,
} from 'src/repositories/provider-address';
import {
  ProviderAddressCreateUseCase,
  ProviderAddressFindAllUseCase,
  ProviderAddressFindOneUseCase,
  ProviderAddressSoftDeleteUseCase,
  ProviderAddressUpdateUseCase,
} from './use-cases';
import { ProviderAddressResolver } from './provider-address.resolver';

export const providerAddressModuleMock: ModuleMetadata = {
  imports: [PrismaModule, ProviderModule, AddressModule],
  providers: [
    ProviderAddressCreateUseCase,
    ProviderAddressFindAllUseCase,
    ProviderAddressFindOneUseCase,
    ProviderAddressSoftDeleteUseCase,
    ProviderAddressUpdateUseCase,
    ProviderAddressResolver,
    {
      provide: IProviderAddressRepository,
      useClass: ProviderAddressRepository,
    },
  ],
};

@Module(providerAddressModuleMock)
export class ProviderAddressModule {}
