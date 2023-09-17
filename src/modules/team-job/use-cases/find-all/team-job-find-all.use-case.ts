import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { TeamJobEntity } from 'src/domain/entities';
import { ITeamJobRepository } from 'src/repositories/team-job';

@Injectable()
export class TeamJobFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, TeamJobEntity[]>
{
  constructor(private readonly teamJobRepository: ITeamJobRepository) {}

  async execute(data: PaginationOptionsInput): Promise<TeamJobEntity[]> {
    return this.teamJobRepository.findAll(data);
  }
}
