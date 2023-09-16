import { IBaseRepository } from 'src/domain/base';
import { CreatePersonTeamInput } from 'src/domain/dtos';
import { PersonTeamEntity } from 'src/domain/entities';

export abstract class IPersonTeamRepository extends IBaseRepository<
  CreatePersonTeamInput,
  PersonTeamEntity
> {
  abstract findByPersonIdAndTeamId(
    personTeamInput: CreatePersonTeamInput,
  ): Promise<PersonTeamEntity>;
}
