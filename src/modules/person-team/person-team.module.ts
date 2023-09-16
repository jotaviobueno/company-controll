import { Module } from '@nestjs/common';
import { PersonTeamResolver } from './person-team.resolver';
import {
  PersonTeamCreateUseCase,
  PersonTeamFindAllUseCase,
  PersonTeamFindByTeamIdAndPersonIdUseCase,
} from './use-cases';
import {
  IPersonTeamRepository,
  PersonTeamRepository,
} from 'src/repositories/person-team';
import { PrismaModule } from 'src/db/prisma.module';

export const personTeamModuleMock = {
  imports: [PrismaModule],
  providers: [
    PersonTeamResolver,
    PersonTeamCreateUseCase,
    PersonTeamFindAllUseCase,
    PersonTeamFindByTeamIdAndPersonIdUseCase,
    { provide: IPersonTeamRepository, useClass: PersonTeamRepository },
  ],
  exports: [PersonTeamCreateUseCase, PersonTeamFindByTeamIdAndPersonIdUseCase],
};

@Module(personTeamModuleMock)
export class PersonTeamModule {}
