import { Module } from '@nestjs/common';
import { TeamRequestResolver } from './team-request.resolver';
import { PersonModule } from '../person/person.module';
import { PrismaModule } from 'src/db/prisma.module';
import { TeamModule } from '../team/team.module';
import {
  ITeamRequestRepository,
  TeamRequestRepository,
} from 'src/repositories/team-request';
import {
  TeamRequestAcceptUseCase,
  TeamRequestCreateUseCase,
  TeamRequestFindOneUseCase,
  TeamRequestRefusedUseCase,
  TeamRequestUpdateUseCase,
  TeamRequestFindAllUseCase,
  TeamRequestCancelUseCase,
} from './use-cases';
import { PersonTeamModule } from '../person-team/person-team.module';

export const teamRequestModuleMock = {
  imports: [PersonModule, PrismaModule, PersonTeamModule, TeamModule],
  providers: [
    TeamRequestResolver,
    TeamRequestAcceptUseCase,
    TeamRequestCreateUseCase,
    TeamRequestFindOneUseCase,
    TeamRequestRefusedUseCase,
    TeamRequestUpdateUseCase,
    TeamRequestFindAllUseCase,
    TeamRequestCancelUseCase,
    { provide: ITeamRequestRepository, useClass: TeamRequestRepository },
  ],
  exports: [TeamRequestFindOneUseCase],
};

@Module(teamRequestModuleMock)
export class TeamRequestModule {}
