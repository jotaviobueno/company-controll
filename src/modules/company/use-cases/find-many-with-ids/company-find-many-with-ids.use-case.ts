import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CompanyEntity } from 'src/domain/entities';
import { ICompanyRepository } from 'src/repositories/company';

@Injectable()
export class CompanyFindManyWithIdsUseCase
  implements IBaseUseCase<string[], CompanyEntity[]>
{
  constructor(private readonly companyRepository: ICompanyRepository) {}

  execute(data: string[]): Promise<CompanyEntity[]> {
    return this.companyRepository.findManyWithIds(data);
  }
}
