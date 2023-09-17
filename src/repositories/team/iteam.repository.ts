import { TeamEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ITeamRepository extends RepositoryFactory<TeamEntity> {
  constructor() {
    super('team');
  }
}
