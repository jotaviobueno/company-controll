import { Injectable } from '@nestjs/common';
import { TeamJobEntity } from 'src/domain/entities';
import { ITeamJobRepository } from './iteam-job.repository';

@Injectable()
export class TeamJobRepository extends ITeamJobRepository {
  findByTeamIdAndJobId(teamId: string, jobId: string): Promise<TeamJobEntity> {
    return this.prismaService.teamJob.findFirst({
      where: {
        teamId,
        jobId,
      },
    });
  }
}
