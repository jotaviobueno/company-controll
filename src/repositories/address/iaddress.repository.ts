import { AddressEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IAddressRepository extends RepositoryFactory<AddressEntity> {
  constructor() {
    super('address');
  }
}
