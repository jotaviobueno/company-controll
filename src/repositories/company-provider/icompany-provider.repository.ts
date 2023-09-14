import { IBaseRepository } from 'src/domain/base';
import { CreateCompanyProviderInput } from 'src/domain/dtos';
import { CompanyProviderEntity } from 'src/domain/entities';

export abstract class ICompanyProviderRepository extends IBaseRepository<
  CreateCompanyProviderInput,
  CompanyProviderEntity
> {}
