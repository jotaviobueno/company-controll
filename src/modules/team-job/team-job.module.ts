import { Module, ModuleMetadata } from '@nestjs/common';
import {
  ITeamJobRepository,
  TeamJobRepository,
} from 'src/repositories/team-job';
import {
  TeamJobCreateUseCase,
  TeamJobFindAllUseCase,
  TeamJobFindOneUseCase,
  TeamJobSoftDeleteUseCase,
} from './use-cases';
import { TeamJobResolver } from './team-job.resolver';
import { TeamModule } from '../team/team.module';
import { JobModule } from '../job/job.module';
import { PrismaModule } from 'src/db/prisma.module';

export const teamJobModuleMock: ModuleMetadata = {
  imports: [TeamModule, JobModule, PrismaModule],
  providers: [
    TeamJobResolver,
    TeamJobCreateUseCase,
    TeamJobFindAllUseCase,
    TeamJobFindOneUseCase,
    TeamJobSoftDeleteUseCase,
    { provide: ITeamJobRepository, useClass: TeamJobRepository },
  ],
  exports: [TeamJobFindOneUseCase],
};

@Module(teamJobModuleMock)
export class TeamJobModule {}
