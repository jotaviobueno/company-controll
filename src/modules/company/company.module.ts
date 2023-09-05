import { Module, ModuleMetadata } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import {
  CompanyFindAllUseCase,
  CompanyFindOneUseCase,
  CompanySoftDeleteUseCase,
  CompanyUpdateUseCase,
  CompanyCreateUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import {
  CompanyRepository,
  ICompanyRepository,
} from 'src/repositories/company';
import { PersonCompanyModule } from '../person-company/person-company.module';
import { PersonModule } from '../person/person.module';
import { AccessModule } from '../access/access.module';

export const companyModuleMock: ModuleMetadata = {
  imports: [PrismaModule, PersonCompanyModule, PersonModule, AccessModule],
  providers: [
    CompanyResolver,
    CompanyCreateUseCase,
    CompanyFindAllUseCase,
    CompanyFindOneUseCase,
    CompanySoftDeleteUseCase,
    CompanyUpdateUseCase,
    { provide: ICompanyRepository, useClass: CompanyRepository },
  ],
  exports: [CompanyFindOneUseCase],
};

@Module(companyModuleMock)
export class CompanyModule {}
