import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PersonCompanyInput } from 'src/domain/dtos';
import { PersonCompanyEntity } from 'src/domain/entities';
import { IPersonCompanyRepository } from 'src/repositories/person-company/iperson-company.repository';

@Injectable()
export class CreatePersonCompanyUseCase
  implements IBaseUseCase<PersonCompanyInput, PersonCompanyEntity>
{
  constructor(
    private readonly personCompanyRepository: IPersonCompanyRepository,
  ) {}

  execute(data: PersonCompanyInput): Promise<PersonCompanyEntity> {
    return this.personCompanyRepository.create(data);
  }
}
