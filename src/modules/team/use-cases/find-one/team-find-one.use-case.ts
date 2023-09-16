import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { TeamEntity } from 'src/domain/entities';
import { ITeamRepository } from 'src/repositories/team';

@Injectable()
export class TeamFindOneUseCase implements IBaseUseCase<string, TeamEntity> {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async execute(data: string): Promise<TeamEntity> {
    const team = await this.teamRepository.findById(data);

    if (!team) throw new HttpException('Team not found', HttpStatus.NOT_FOUND);

    return team;
  }
}
