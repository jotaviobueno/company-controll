import { CompanyEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ICompanyRepository extends RepositoryFactory<CompanyEntity> {
  constructor() {
    super('company');
  }

  abstract findByCnpj(cnpj: string): Promise<CompanyEntity>;
}
