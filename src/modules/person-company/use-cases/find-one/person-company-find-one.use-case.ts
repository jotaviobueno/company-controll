import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PersonCompanyEntity } from 'src/domain/entities';
import { IPersonCompanyRepository } from 'src/repositories/person-company';

@Injectable()
export class PersonCompanyFindOneUseCase
  implements IBaseUseCase<string, PersonCompanyEntity>
{
  constructor(
    private readonly personCompanyRepository: IPersonCompanyRepository,
  ) {}

  async execute(data: string): Promise<PersonCompanyEntity> {
    const personCompany = await this.personCompanyRepository.findById(data);

    if (!personCompany)
      throw new HttpException('Person company not found', HttpStatus.NOT_FOUND);

    return personCompany;
  }
}
