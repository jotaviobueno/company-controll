import { IBaseRepository } from 'src/domain/base';
import { CreatePersonAddressInput } from 'src/domain/dtos';
import { PersonAddressEntity } from 'src/domain/entities';

export abstract class IPersonAddressRepository extends IBaseRepository<
  CreatePersonAddressInput,
  PersonAddressEntity
> {}
