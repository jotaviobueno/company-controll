import { ProviderAddressEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IProviderAddressRepository extends RepositoryFactory<ProviderAddressEntity> {
  constructor() {
    super('providerAddress');
  }
}
