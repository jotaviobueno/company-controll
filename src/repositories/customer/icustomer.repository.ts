import { IBaseRepository } from 'src/domain/base';
import { CreateCustomerInput, UpdateCustomerInput } from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';

export abstract class ICustomerRepository extends IBaseRepository<
  CreateCustomerInput,
  CustomerEntity,
  UpdateCustomerInput
> {
  abstract findByCpf(cpf: string): Promise<CustomerEntity>;
  abstract findByEmail(email: string): Promise<CustomerEntity>;
}
