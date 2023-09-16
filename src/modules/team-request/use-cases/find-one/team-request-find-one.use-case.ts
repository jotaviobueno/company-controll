import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { TeamRequestEntity } from 'src/domain/entities';
import { ITeamRequestRepository } from 'src/repositories/team-request';

@Injectable()
export class TeamRequestFindOneUseCase
  implements IBaseUseCase<string, TeamRequestEntity>
{
  constructor(private readonly teamRequestRepository: ITeamRequestRepository) {}

  async execute(data: string): Promise<TeamRequestEntity> {
    const teamRequest = await this.teamRequestRepository.findById(data);

    if (!teamRequest)
      throw new HttpException('Team Request not found', HttpStatus.NOT_FOUND);

    return teamRequest;
  }
}
