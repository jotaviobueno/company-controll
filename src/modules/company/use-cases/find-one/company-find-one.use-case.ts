import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CompanyEntity } from 'src/domain/entities';
import { ICompanyRepository } from 'src/repositories/company';

@Injectable()
export class CompanyFindOneUseCase
  implements IBaseUseCase<string, CompanyEntity>
{
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(data: string): Promise<CompanyEntity> {
    const company = await this.companyRepository.findById(data);

    if (!company)
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);

    return company;
  }
}
