import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { CompanyEntity } from 'src/domain/entities';
import { ICompanyRepository } from 'src/repositories/company';

@Injectable()
export class CompanyFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, CompanyEntity[]>
{
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(data: PaginationOptionsInput): Promise<CompanyEntity[]> {
    return this.companyRepository.findAll(data);
  }
}
