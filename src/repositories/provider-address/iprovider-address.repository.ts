import { IBaseRepository } from 'src/domain/base';
import { CreateProviderAddressInput } from 'src/domain/dtos';
import { ProviderAddressEntity } from 'src/domain/entities';

export abstract class IProviderAddressRepository extends IBaseRepository<
  CreateProviderAddressInput,
  ProviderAddressEntity
> {}
