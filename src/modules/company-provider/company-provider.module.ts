import { Module } from '@nestjs/common';
import { CompanyProviderResolver } from './company-provider.resolver';
import { CompanyProviderCreateUseCase } from './use-cases';
import {
  CompanyProviderRepository,
  ICompanyProviderRepository,
} from 'src/repositories/company-provider';
import { CompanyModule } from '../company/company.module';
import { ProviderModule } from '../provider/provider.module';

export const companyProviderModuleMock = {
  imports: [CompanyModule, ProviderModule],
  providers: [
    CompanyProviderResolver,
    CompanyProviderCreateUseCase,
    {
      provide: ICompanyProviderRepository,
      useClass: CompanyProviderRepository,
    },
  ],
};

@Module(companyProviderModuleMock)
export class CompanyProviderModule {}
