import { CompanyProviderEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ICompanyProviderRepository extends RepositoryFactory<CompanyProviderEntity> {
  constructor() {
    super('companyProvider');
  }
}
