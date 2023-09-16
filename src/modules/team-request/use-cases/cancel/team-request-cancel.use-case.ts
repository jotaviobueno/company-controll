import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { TeamRequestEntity } from 'src/domain/entities';
import { TeamRequestFindOneUseCase } from '../find-one';
import { TeamRequestUpdateUseCase } from '../update';
import { PersonTeamCreateUseCase } from 'src/modules/person-team/use-cases';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';

@Injectable()
export class TeamRequestCancelUseCase
  implements IBaseUseCase<string, TeamRequestEntity>
{
  constructor(
    private readonly teamRequestFindOneUseCase: TeamRequestFindOneUseCase,
    private readonly teamRequestUpdateUseCase: TeamRequestUpdateUseCase,
    private readonly personTeamCreateUseCase: PersonTeamCreateUseCase,
  ) {}

  async execute(data: string): Promise<TeamRequestEntity> {
    const teamRequest = await this.teamRequestFindOneUseCase.execute(data);

    await this.personTeamCreateUseCase.execute({
      personId: teamRequest.personId,
      teamId: teamRequest.teamId,
    });

    await this.teamRequestUpdateUseCase.execute({
      id: teamRequest.id,
      status: TEAM_REQUEST_STATUS.CANCELED,
    });

    return teamRequest;
  }
}
