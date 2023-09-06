import { Module } from '@nestjs/common';
import { PersonAddressResolver } from './person-address.resolver';
import {
  PersonAddressCreateUseCase,
  PersonAddressUpdateUseCase,
  PersonAddressFindAllUseCase,
  PersonAddressFindOneUseCase,
  PersonAddressSoftDeleteUseCase,
} from './use-cases';
import {
  IPersonAddressRepository,
  PersonAddressRepository,
} from 'src/repositories/person-address';
import { PersonModule } from '../person/person.module';
import { PrismaModule } from 'src/db/prisma.module';
import { AddressModule } from '../address/address.module';

export const personAddressModuleMock = {
  imports: [PersonModule, PrismaModule, AddressModule],
  providers: [
    PersonAddressResolver,
    PersonAddressCreateUseCase,
    PersonAddressUpdateUseCase,
    PersonAddressFindAllUseCase,
    PersonAddressFindOneUseCase,
    PersonAddressSoftDeleteUseCase,
    { provide: IPersonAddressRepository, useClass: PersonAddressRepository },
  ],
};

@Module(personAddressModuleMock)
export class PersonAddressModule {}
