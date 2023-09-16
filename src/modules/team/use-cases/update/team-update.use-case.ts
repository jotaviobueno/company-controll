import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { UpdateTeamInput } from 'src/domain/dtos';
import { TeamEntity } from 'src/domain/entities';
import { ITeamRepository } from 'src/repositories/team';
import { TeamFindOneUseCase } from '../find-one';

@Injectable()
export class TeamUpdateUseCase
  implements IBaseUseCase<UpdateTeamInput, TeamEntity>
{
  constructor(
    private readonly teamRepository: ITeamRepository,
    private readonly teamFindOneUseCase: TeamFindOneUseCase,
  ) {}

  async execute(data: UpdateTeamInput): Promise<TeamEntity> {
    const team = await this.teamFindOneUseCase.execute(data.id);

    const update = await this.teamRepository.update({ id: team.id, ...data });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
