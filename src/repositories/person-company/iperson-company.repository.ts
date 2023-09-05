import { IBaseRepository } from 'src/domain/base';
import { PersonCompanyInput } from 'src/domain/dtos';
import { PersonCompanyEntity } from 'src/domain/entities';

export abstract class IPersonCompanyRepository extends IBaseRepository<
  PersonCompanyInput,
  PersonCompanyEntity
> {}
