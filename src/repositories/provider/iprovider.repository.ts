import { ProviderEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IProviderRepository extends RepositoryFactory<ProviderEntity> {
  constructor() {
    super('provider');
  }
}
