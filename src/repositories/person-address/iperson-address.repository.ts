import { PersonAddressEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IPersonAddressRepository extends RepositoryFactory<PersonAddressEntity> {
  constructor() {
    super('personAddress');
  }
}
