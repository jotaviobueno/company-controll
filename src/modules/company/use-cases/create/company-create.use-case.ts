import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateCompanyInput } from 'src/domain/dtos';
import { CompanyEntity } from 'src/domain/entities';
import { getCnpj } from 'src/domain/utils';
import { ICompanyRepository } from 'src/repositories/company';

@Injectable()
export class CompanyCreateUseCase
  implements IBaseUseCase<CreateCompanyInput, CompanyEntity>
{
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(data: CreateCompanyInput): Promise<CompanyEntity> {
    const cnpjAlreadyExist = await this.companyRepository.findByCnpj(data.cnpj);

    if (cnpjAlreadyExist)
      throw new HttpException('Cnpj already exists', HttpStatus.CONFLICT);

    const { createCompanyInput } = await getCnpj(data.cnpj);

    const company = await this.companyRepository.create({
      ...createCompanyInput,
    });

    return company;
  }
}
