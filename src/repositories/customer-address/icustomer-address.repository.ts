import { CustomerAddressEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ICustomerAddressRepostiroy extends RepositoryFactory<CustomerAddressEntity> {
  constructor() {
    super('customerAddress');
  }
}
