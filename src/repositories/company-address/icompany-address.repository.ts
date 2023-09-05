import { IBaseRepository } from 'src/domain/base';
import { CreateCompanyAddressInput } from 'src/domain/dtos';
import { CompanyAddressEntity } from 'src/domain/entities';

export abstract class ICompanyAddressRepository extends IBaseRepository<
  CreateCompanyAddressInput,
  CompanyAddressEntity
> {}
