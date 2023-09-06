import { IBaseRepository } from 'src/domain/base';
import { CreateCompanyInput, UpdateCompanyInput } from 'src/domain/dtos';
import { CompanyEntity } from 'src/domain/entities';

export abstract class ICompanyRepository extends IBaseRepository<
  CreateCompanyInput,
  CompanyEntity,
  UpdateCompanyInput
> {
  abstract findByCnpj(cnpj: string): Promise<CompanyEntity>;
}
