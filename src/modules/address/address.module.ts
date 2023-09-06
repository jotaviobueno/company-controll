import { Module, ModuleMetadata } from '@nestjs/common';
import {
  AddressFindOneUseCase,
  AddressCreateUseCase,
  AddressUpdateUseCase,
  AddressFindManyWithIdsUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import {
  AddressRepository,
  IAddressRepository,
} from 'src/repositories/address';
import { AddressSoftDeleteUseCase } from './use-cases/soft-delete';

export const addressModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    AddressFindOneUseCase,
    AddressCreateUseCase,
    AddressUpdateUseCase,
    AddressSoftDeleteUseCase,
    AddressFindManyWithIdsUseCase,
    { provide: IAddressRepository, useClass: AddressRepository },
  ],
  exports: [
    AddressFindOneUseCase,
    AddressCreateUseCase,
    AddressUpdateUseCase,
    AddressSoftDeleteUseCase,
    AddressFindManyWithIdsUseCase,
  ],
};

@Module(addressModuleMock)
export class AddressModule {}
