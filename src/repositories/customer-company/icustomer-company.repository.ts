import { CustomerCompanyEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ICustomerCompanyRepository extends RepositoryFactory<CustomerCompanyEntity> {
  constructor() {
    super('customerCompany');
  }
}
