import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreatePersonTeamInput } from 'src/domain/dtos';
import { PersonTeamEntity } from 'src/domain/entities';
import { IPersonTeamRepository } from 'src/repositories/person-team';

@Injectable()
export class PersonTeamCreateUseCase
  implements IBaseUseCase<CreatePersonTeamInput, PersonTeamEntity>
{
  constructor(private readonly personTeamRepository: IPersonTeamRepository) {}

  execute(data: CreatePersonTeamInput): Promise<PersonTeamEntity> {
    return this.personTeamRepository.create(data);
  }
}
