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

export const companyModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    CompanyResolver,
    CompanyCreateUseCase,
    CompanyFindAllUseCase,
    CompanyFindOneUseCase,
    CompanySoftDeleteUseCase,
    CompanyUpdateUseCase,
    { provide: ICompanyRepository, useClass: CompanyRepository },
  ],
};

@Module(companyModuleMock)
export class CompanyModule {}
