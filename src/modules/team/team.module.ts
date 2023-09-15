import { Module } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { PrismaModule } from 'src/db/prisma.module';
import { ITeamRepository, TeamRepository } from 'src/repositories/team';
import {
  TeamCreateUseCase,
  TeamFindOneUseCase,
  TeamSoftDeleteUseCase,
  TeamUpdateUseCase,
  TeamFindAllUseCase,
} from './use-cases';
import { TeamResolver } from './team.resolver';

export const teamModuleMock = {
  imports: [PrismaModule, CompanyModule],
  providers: [
    TeamResolver,
    TeamCreateUseCase,
    TeamFindOneUseCase,
    TeamSoftDeleteUseCase,
    TeamUpdateUseCase,
    TeamFindAllUseCase,
    { provide: ITeamRepository, useClass: TeamRepository },
  ],
};

@Module(teamModuleMock)
export class TeamModule {}
