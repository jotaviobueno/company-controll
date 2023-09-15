import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { TeamEntity } from 'src/domain/entities';
import { ITeamRepository } from 'src/repositories/team';

@Injectable()
export class TeamFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, TeamEntity[]>
{
  constructor(private readonly teamRepository: ITeamRepository) {}

  execute(data: PaginationOptionsInput): Promise<TeamEntity[]> {
    return this.teamRepository.findAll(data);
  }
}
