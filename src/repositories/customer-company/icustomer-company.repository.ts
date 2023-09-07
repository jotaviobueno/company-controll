import { IBaseRepository } from 'src/domain/base';
import { CustomerCompanyInput } from 'src/domain/dtos';
import { CustomerCompanyEntity } from 'src/domain/entities';

export abstract class ICustomerCompanyRepository extends IBaseRepository<
  CustomerCompanyInput,
  CustomerCompanyEntity
> {}
