import { TeamJobEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ITeamJobRepository extends RepositoryFactory<TeamJobEntity> {
  constructor() {
    super('teamJob');
  }

  abstract findByTeamIdAndJobId(
    teamId: string,
    jobId: string,
  ): Promise<TeamJobEntity>;
}
