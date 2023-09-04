import { IBaseRepository } from 'src/domain/base';
import { CreateAddressInput, UpdateAddressInput } from 'src/domain/dtos';
import { AddressEntity } from 'src/domain/entities';

export abstract class IAddressRepository extends IBaseRepository<
  CreateAddressInput,
  AddressEntity,
  UpdateAddressInput
> {}
