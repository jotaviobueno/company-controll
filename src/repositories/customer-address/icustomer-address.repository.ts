import { IBaseRepository } from 'src/domain/base';
import { CreateCustomerAddressInput } from 'src/domain/dtos';
import { CustomerAddressEntity } from 'src/domain/entities';

export abstract class ICustomerAddressRepostiroy extends IBaseRepository<
  CreateCustomerAddressInput,
  CustomerAddressEntity
> {}
