import { Module, ModuleMetadata, forwardRef } from '@nestjs/common';
import { PersonResolver } from './person.resolver';
import {
  PersonCreateUseCase,
  PersonFindAllUseCase,
  PersonFindByAccessIdUseCase,
  PersonFindOneUseCase,
  PersonSoftDeleteUseCase,
  PersonUpdateUseCase,
} from './use-cases';
import { IPersonRepository, PersonRepository } from 'src/repositories/person';
import { PrismaModule } from 'src/db/prisma.module';
import { PersonRoleModule } from '../person-role/person-role.module';

export const personModuleMock: ModuleMetadata = {
  imports: [PrismaModule, forwardRef(() => PersonRoleModule)],
  providers: [
    PersonResolver,
    PersonCreateUseCase,
    PersonFindAllUseCase,
    PersonFindOneUseCase,
    PersonUpdateUseCase,
    PersonFindByAccessIdUseCase,
    PersonSoftDeleteUseCase,
    { provide: IPersonRepository, useClass: PersonRepository },
  ],
  exports: [
    PersonCreateUseCase,
    PersonFindByAccessIdUseCase,
    PersonFindOneUseCase,
  ],
};

@Module(personModuleMock)
export class PersonModule {}
