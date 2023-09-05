import { Module, ModuleMetadata } from '@nestjs/common';
import { CompanyAddressResolver } from './company-address.resolver';
import { PrismaModule } from 'src/db/prisma.module';
import { AddressModule } from '../address/address.module';
import { CompanyModule } from '../company/company.module';
import {
  CompanyAddressCreateUseCase,
  CompanyAddressFindAllUseCase,
  CompanyAddressFindOneUseCase,
  CompanyAddressSoftDeleteUseCase,
  CompanyAddressUpdateUseCase,
} from './use-cases';
import {
  CompanyAddressRepository,
  ICompanyAddressRepository,
} from 'src/repositories/company-address';

export const companyAddressModuleMock: ModuleMetadata = {
  imports: [PrismaModule, AddressModule, CompanyModule],
  providers: [
    CompanyAddressResolver,
    CompanyAddressCreateUseCase,
    CompanyAddressFindAllUseCase,
    CompanyAddressFindOneUseCase,
    CompanyAddressUpdateUseCase,
    CompanyAddressSoftDeleteUseCase,
    { provide: ICompanyAddressRepository, useClass: CompanyAddressRepository },
  ],
};

@Module(companyAddressModuleMock)
export class CompanyAddressModule {}
