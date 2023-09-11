import { Module, ModuleMetadata, forwardRef } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import {
  CompanyFindAllUseCase,
  CompanyFindOneUseCase,
  CompanySoftDeleteUseCase,
  CompanyUpdateUseCase,
  CompanyCreateUseCase,
  CompanyFindManyWithIdsUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import {
  CompanyRepository,
  ICompanyRepository,
} from 'src/repositories/company';
import { PersonCompanyModule } from '../person-company/person-company.module';
import { PersonModule } from '../person/person.module';
import { AccessModule } from '../access/access.module';
import { CompanyAddressModule } from '../company-address/company-address.module';

export const companyModuleMock: ModuleMetadata = {
  imports: [
    PrismaModule,
    PersonCompanyModule,
    PersonModule,
    AccessModule,
    forwardRef(() => CompanyAddressModule),
  ],
  providers: [
    CompanyResolver,
    CompanyCreateUseCase,
    CompanyFindAllUseCase,
    CompanyFindOneUseCase,
    CompanySoftDeleteUseCase,
    CompanyUpdateUseCase,
    CompanyFindManyWithIdsUseCase,
    { provide: ICompanyRepository, useClass: CompanyRepository },
  ],
  exports: [CompanyFindOneUseCase, CompanyFindManyWithIdsUseCase],
};

@Module(companyModuleMock)
export class CompanyModule {}
