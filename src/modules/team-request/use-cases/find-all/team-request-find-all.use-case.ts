import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { TeamRequestEntity } from 'src/domain/entities';
import { ITeamRequestRepository } from 'src/repositories/team-request';

@Injectable()
export class TeamRequestFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, TeamRequestEntity[]>
{
  constructor(private readonly teamRequestRepository: ITeamRequestRepository) {}

  execute(data: PaginationOptionsInput): Promise<TeamRequestEntity[]> {
    return this.teamRequestRepository.findAll(data);
  }
}
