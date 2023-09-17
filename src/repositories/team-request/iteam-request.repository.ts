import { CreateTeamRequestInput } from 'src/domain/dtos';
import { TeamRequestEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ITeamRequestRepository extends RepositoryFactory<TeamRequestEntity> {
  constructor() {
    super('teamRequest');
  }

  abstract findByPersonIdAndPersonId(
    teamRequestInput: CreateTeamRequestInput,
  ): Promise<TeamRequestEntity>;
}
