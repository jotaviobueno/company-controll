import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { CompanyAddressEntity } from 'src/domain/entities';
import { ICompanyAddressRepository } from 'src/repositories/company-address';

@Injectable()
export class CompanyAddressFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, CompanyAddressEntity[]>
{
  constructor(
    private readonly companyAddressRepository: ICompanyAddressRepository,
  ) {}

  execute(data: PaginationOptionsInput): Promise<CompanyAddressEntity[]> {
    return this.companyAddressRepository.findAll(data);
  }
}
