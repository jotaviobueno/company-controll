import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ITeamJobRepository } from 'src/repositories/team-job';
import { TeamJobFindOneUseCase } from '../find-one';

@Injectable()
export class TeamJobSoftDeleteUseCase implements IBaseUseCase<string, boolean> {
  constructor(
    private readonly teamJobRepository: ITeamJobRepository,
    private readonly teamJobFindOneUseCase: TeamJobFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const teamJob = await this.teamJobFindOneUseCase.execute(data);

    const teamJobAlreadyExist =
      await this.teamJobRepository.findByTeamIdAndJobId(
        teamJob.teamId,
        teamJob.jobId,
      );

    if (!teamJobAlreadyExist)
      throw new HttpException(
        'This team not have this job',
        HttpStatus.BAD_REQUEST,
      );

    const remove = await this.teamJobRepository.softDelete(teamJob.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
