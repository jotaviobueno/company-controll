import { Module, ModuleMetadata } from '@nestjs/common';
import { PersonCompanyResolver } from './person-company.resolver';
import {
  CreatePersonCompanyUseCase,
  PersonCompanyFindAllUseCase,
  PersonCompanyFindOneUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import {
  IPersonCompanyRepository,
  PersonCompanyRepository,
} from 'src/repositories/person-company';

export const personCompanyModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    PersonCompanyResolver,
    CreatePersonCompanyUseCase,
    PersonCompanyFindOneUseCase,
    PersonCompanyFindAllUseCase,
    { provide: IPersonCompanyRepository, useClass: PersonCompanyRepository },
  ],
  exports: [CreatePersonCompanyUseCase],
};

@Module(personCompanyModuleMock)
export class PersonCompanyModule {}
