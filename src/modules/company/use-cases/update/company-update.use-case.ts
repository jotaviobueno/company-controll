import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { UpdateCompanyInput } from 'src/domain/dtos';
import { CompanyEntity } from 'src/domain/entities';
import { ICompanyRepository } from 'src/repositories/company';
import { CompanyFindOneUseCase } from '../find-one';

@Injectable()
export class CompanyUpdateUseCase
  implements IBaseUseCase<UpdateCompanyInput, CompanyEntity>
{
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly companyFindOneUseCase: CompanyFindOneUseCase,
  ) {}

  async execute(data: UpdateCompanyInput): Promise<CompanyEntity> {
    const company = await this.companyFindOneUseCase.execute(data.id);

    const update = await this.companyRepository.update({
      id: company.id,
      ...data,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
