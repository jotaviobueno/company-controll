import { CustomerEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ICustomerRepository extends RepositoryFactory<CustomerEntity> {
  constructor() {
    super('customer');
  }

  abstract findByCpf(cpf: string): Promise<CustomerEntity>;
  abstract findByEmail(email: string): Promise<CustomerEntity>;
}
