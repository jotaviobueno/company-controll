import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { PersonTeamEntity } from 'src/domain/entities';
import { IPersonTeamRepository } from 'src/repositories/person-team';

@Injectable()
export class PersonTeamFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, PersonTeamEntity[]>
{
  constructor(private readonly personTeamRepository: IPersonTeamRepository) {}

  async execute(data: PaginationOptionsInput): Promise<PersonTeamEntity[]> {
    return this.personTeamRepository.findAll(data);
  }
}
