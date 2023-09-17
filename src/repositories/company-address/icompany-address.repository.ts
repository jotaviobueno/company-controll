import { CompanyAddressEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ICompanyAddressRepository extends RepositoryFactory<CompanyAddressEntity> {
  constructor() {
    super('companyAddress');
  }

  abstract findManyWithCompanyId(
    companiesIds: string[],
  ): Promise<CompanyAddressEntity[]>;
}
