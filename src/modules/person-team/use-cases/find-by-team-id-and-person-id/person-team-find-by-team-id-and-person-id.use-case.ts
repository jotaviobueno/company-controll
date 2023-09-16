import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreatePersonTeamInput } from 'src/domain/dtos';
import { PersonTeamEntity } from 'src/domain/entities';
import { IPersonTeamRepository } from 'src/repositories/person-team';

@Injectable()
export class PersonTeamFindByTeamIdAndPersonIdUseCase
  implements IBaseUseCase<CreatePersonTeamInput, PersonTeamEntity>
{
  constructor(private readonly personTeamRepository: IPersonTeamRepository) {}

  async execute(data: CreatePersonTeamInput): Promise<PersonTeamEntity> {
    const personTeam =
      await this.personTeamRepository.findByPersonIdAndTeamId(data);

    if (personTeam)
      throw new HttpException(
        'This person already in this team',
        HttpStatus.CONFLICT,
      );

    return personTeam;
  }
}
