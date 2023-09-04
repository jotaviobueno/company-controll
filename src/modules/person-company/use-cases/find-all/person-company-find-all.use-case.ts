import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { PersonCompanyEntity } from 'src/domain/entities';
import { IPersonCompanyRepository } from 'src/repositories/person-company/iperson-company.repository';

@Injectable()
export class PersonCompanyFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, PersonCompanyEntity[]>
{
  constructor(
    private readonly personCompanyRepository: IPersonCompanyRepository,
  ) {}

  execute(data: PaginationOptionsInput): Promise<PersonCompanyEntity[]> {
    return this.personCompanyRepository.findAll(data);
  }
}
