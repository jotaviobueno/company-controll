import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateCompanyInput } from 'src/domain/dtos';
import { CompanyEntity } from 'src/domain/entities';
import { getCnpj } from 'src/domain/utils';
import { CreatePersonCompanyUseCase } from 'src/modules/person-company/use-cases';
import { ICompanyRepository } from 'src/repositories/company';

@Injectable()
export class CompanyCreateUseCase
  implements
    IBaseUseCase<CreateCompanyInput & { personId: string }, CompanyEntity>
{
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly createPersonCompanyUseCase: CreatePersonCompanyUseCase,
  ) {}

  async execute(
    data: CreateCompanyInput & { personId: string },
  ): Promise<CompanyEntity> {
    const cnpjAlreadyExist = await this.companyRepository.findByCnpj(data.cnpj);

    if (cnpjAlreadyExist)
      throw new HttpException('Cnpj already exists', HttpStatus.CONFLICT);

    const { createCompanyInput } = await getCnpj(data.cnpj);

    const company = await this.companyRepository.create({
      ...createCompanyInput,
    });

    await this.createPersonCompanyUseCase.execute({
      companyId: company.id,
      personId: data.personId,
    });

    return company;
  }
}
