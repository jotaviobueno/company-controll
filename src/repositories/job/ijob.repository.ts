import { JobEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IJobRepository extends RepositoryFactory<JobEntity> {
  constructor() {
    super('job');
  }
}
