import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { UpdateTeamRequestInput } from 'src/domain/dtos/team-request/update-team-request.input';
import { TeamRequestEntity } from 'src/domain/entities';
import { ITeamRequestRepository } from 'src/repositories/team-request';

@Injectable()
export class TeamRequestUpdateUseCase
  implements IBaseUseCase<UpdateTeamRequestInput, TeamRequestEntity>
{
  constructor(private readonly teamRequestRepository: ITeamRequestRepository) {}

  execute(data: UpdateTeamRequestInput): Promise<TeamRequestEntity> {
    return this.teamRequestRepository.update(data);
  }
}
