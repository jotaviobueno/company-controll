import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateTeamRequestInput } from 'src/domain/dtos';
import { TeamRequestEntity } from 'src/domain/entities';
import { PersonTeamFindByTeamIdAndPersonIdUseCase } from 'src/modules/person-team/use-cases';
import { PersonFindOneUseCase } from 'src/modules/person/use-cases';
import { TeamFindOneUseCase } from 'src/modules/team/use-cases';
import { ITeamRequestRepository } from 'src/repositories/team-request';

@Injectable()
export class TeamRequestCreateUseCase
  implements IBaseUseCase<CreateTeamRequestInput, TeamRequestEntity>
{
  constructor(
    private readonly teamRequestRepository: ITeamRequestRepository,
    private readonly personTeamFindByTeamIdAndPersonIdUseCase: PersonTeamFindByTeamIdAndPersonIdUseCase,
    private readonly teamFindOneUseCase: TeamFindOneUseCase,
    private readonly personFindOneUseCase: PersonFindOneUseCase,
  ) {}

  async execute(data: CreateTeamRequestInput): Promise<TeamRequestEntity> {
    const person = await this.personFindOneUseCase.execute(data.personId);

    const team = await this.teamFindOneUseCase.execute(data.teamId);

    const teamRequestAlreadyExist =
      await this.teamRequestRepository.findByPersonIdAndPersonId(data);

    if (teamRequestAlreadyExist)
      throw new HttpException(
        'This person already has a pending team entry request',
        HttpStatus.CONFLICT,
      );

    await this.personTeamFindByTeamIdAndPersonIdUseCase.execute({
      personId: person.id,
      teamId: team.id,
    });

    const teamRequest = await this.teamRequestRepository.create(data);

    return teamRequest;
  }
}
