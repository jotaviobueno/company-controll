import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ICompanyRepository } from 'src/repositories/company';
import { CompanyFindOneUseCase } from '../find-one';

@Injectable()
export class CompanySoftDeleteUseCase implements IBaseUseCase<string, boolean> {
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly companyFindOneUseCase: CompanyFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const company = await this.companyFindOneUseCase.execute(data);

    const remove = await this.companyRepository.softDelete(company.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
