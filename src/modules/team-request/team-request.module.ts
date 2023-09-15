import { Module } from '@nestjs/common';
import { TeamRequestService } from './team-request.service';
import { TeamRequestResolver } from './team-request.resolver';
import { ITeamRequestRepository, TeamRequestRepository } from './repository';

@Module({
  providers: [
    TeamRequestResolver,
    TeamRequestService,
    { provide: ITeamRequestRepository, useClass: TeamRequestRepository },
  ],
  exports: [TeamRequestService],
})
export class TeamRequestModule {}
