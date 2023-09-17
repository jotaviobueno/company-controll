import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { TeamJobEntity } from 'src/domain/entities';
import { ITeamJobRepository } from 'src/repositories/team-job';

@Injectable()
export class TeamJobFindOneUseCase
  implements IBaseUseCase<string, TeamJobEntity>
{
  constructor(private readonly teamJobRepository: ITeamJobRepository) {}

  async execute(data: string): Promise<TeamJobEntity> {
    const teamJob = await this.teamJobRepository.findById(data);

    if (!teamJob)
      throw new HttpException('team Job not found', HttpStatus.NOT_FOUND);

    return teamJob;
  }
}
