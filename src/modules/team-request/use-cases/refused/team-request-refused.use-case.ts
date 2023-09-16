import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { TeamRequestEntity } from 'src/domain/entities';
import { TeamRequestFindOneUseCase } from '../find-one';
import { PersonTeamCreateUseCase } from 'src/modules/person-team/use-cases';
import { TeamRequestUpdateUseCase } from '../update';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';

@Injectable()
export class TeamRequestRefusedUseCase
  implements IBaseUseCase<string, TeamRequestEntity>
{
  constructor(
    private readonly teamRequestFindOneUseCase: TeamRequestFindOneUseCase,
    private readonly teamRequestUpdateUseCase: TeamRequestUpdateUseCase,
    private readonly personTeamCreateUseCase: PersonTeamCreateUseCase,
  ) {}

  async execute(data: string): Promise<TeamRequestEntity> {
    const teamRequest = await this.teamRequestFindOneUseCase.execute(data);

    await this.teamRequestUpdateUseCase.execute({
      id: teamRequest.id,
      status: TEAM_REQUEST_STATUS.REFUSED,
    });

    return teamRequest;
  }
}
