import { Module, ModuleMetadata } from '@nestjs/common';
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

export const personModuleMock: ModuleMetadata = {
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
