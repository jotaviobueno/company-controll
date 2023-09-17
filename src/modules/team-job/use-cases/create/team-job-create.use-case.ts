import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateTeamJobInput } from 'src/domain/dtos';
import { TeamJobEntity } from 'src/domain/entities';
import { JobFindOneUseCase } from 'src/modules/job/use-cases';
import { TeamFindOneUseCase } from 'src/modules/team/use-cases';
import { ITeamJobRepository } from 'src/repositories/team-job';

@Injectable()
export class TeamJobCreateUseCase
  implements IBaseUseCase<CreateTeamJobInput, TeamJobEntity>
{
  constructor(
    private readonly teamJobRepository: ITeamJobRepository,
    private readonly teamFindOneUseCase: TeamFindOneUseCase,
    private readonly jobFindOneUseCase: JobFindOneUseCase,
  ) {}

  async execute(data: CreateTeamJobInput): Promise<TeamJobEntity> {
    const team = await this.teamFindOneUseCase.execute(data.teamId);

    const job = await this.jobFindOneUseCase.execute(data.jobId);

    const teamJobAlreadyExist =
      await this.teamJobRepository.findByTeamIdAndJobId(team.id, job.id);

    if (teamJobAlreadyExist)
      throw new HttpException(
        'this team already this job',
        HttpStatus.CONFLICT,
      );

    const teamJob = await this.teamJobRepository.create({
      jobId: job.id,
      teamId: team.id,
    });

    return teamJob;
  }
}
