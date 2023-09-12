import { IBaseRepository } from 'src/domain/base';
import { CreateProviderInput, UpdateProviderInput } from 'src/domain/dtos';
import { ProviderEntity } from 'src/domain/entities';

export abstract class IProviderRepository extends IBaseRepository<
  CreateProviderInput,
  ProviderEntity,
  UpdateProviderInput
> {}
