import { Module, ModuleMetadata } from '@nestjs/common';
import {
  AddressFindOneUseCase,
  AddressCreateUseCase,
  AddressUpdateUseCase,
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
    { provide: IAddressRepository, useClass: AddressRepository },
  ],
  exports: [AddressFindOneUseCase, AddressCreateUseCase, AddressUpdateUseCase],
};

@Module(addressModuleMock)
export class AddressModule {}
