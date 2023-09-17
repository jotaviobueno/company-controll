import { CreatePersonTeamInput } from 'src/domain/dtos';
import { PersonTeamEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IPersonTeamRepository extends RepositoryFactory<PersonTeamEntity> {
  constructor() {
    super('personTeam');
  }

  abstract findByPersonIdAndTeamId(
    personTeamInput: CreatePersonTeamInput,
  ): Promise<PersonTeamEntity>;
}
