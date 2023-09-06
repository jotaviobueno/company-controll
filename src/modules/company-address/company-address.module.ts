import { Module, ModuleMetadata, forwardRef } from '@nestjs/common';
import { CompanyAddressResolver } from './company-address.resolver';
import { PrismaModule } from 'src/db/prisma.module';
import { AddressModule } from '../address/address.module';
import { CompanyModule } from '../company/company.module';
import {
  CompanyAddressCreateUseCase,
  CompanyAddressFindAllUseCase,
  CompanyAddressFindManyWithCompanyIdUseCase,
  CompanyAddressFindOneUseCase,
  CompanyAddressSoftDeleteUseCase,
  CompanyAddressUpdateUseCase,
} from './use-cases';
import {
  CompanyAddressRepository,
  ICompanyAddressRepository,
} from 'src/repositories/company-address';
import { LoaderAddressByCompanyId } from './dataloaders';

export const companyAddressModuleMock: ModuleMetadata = {
  imports: [PrismaModule, AddressModule, forwardRef(() => CompanyModule)],
  providers: [
    CompanyAddressResolver,
    CompanyAddressCreateUseCase,
    CompanyAddressFindAllUseCase,
    CompanyAddressFindOneUseCase,
    CompanyAddressUpdateUseCase,
    CompanyAddressSoftDeleteUseCase,
    CompanyAddressFindManyWithCompanyIdUseCase,
    LoaderAddressByCompanyId,
    { provide: ICompanyAddressRepository, useClass: CompanyAddressRepository },
  ],
  exports: [
    CompanyAddressFindManyWithCompanyIdUseCase,
    LoaderAddressByCompanyId,
  ],
};

@Module(companyAddressModuleMock)
export class CompanyAddressModule {}
