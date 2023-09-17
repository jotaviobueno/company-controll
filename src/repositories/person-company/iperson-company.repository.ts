import { PersonCompanyEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IPersonCompanyRepository extends RepositoryFactory<PersonCompanyEntity> {
  constructor() {
    super('personCompany');
  }
}
