import { PersonEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IPersonRepository extends RepositoryFactory<PersonEntity> {
  constructor() {
    super('person');
  }

  abstract findByAccessId(accessId: string): Promise<PersonEntity>;
}
