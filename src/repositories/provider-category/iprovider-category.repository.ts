import { ProviderEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IProviderCategoryRepository extends RepositoryFactory<ProviderEntity> {
  constructor() {
    super('providerCategory');
  }
}
