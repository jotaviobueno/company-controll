import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CompanyAddressEntity } from 'src/domain/entities';
import { ICompanyAddressRepository } from 'src/repositories/company-address';

@Injectable()
export class CompanyAddressFindManyWithCompanyIdUseCase
  implements IBaseUseCase<string[], CompanyAddressEntity[]>
{
  constructor(
    private readonly companyAddressRepository: ICompanyAddressRepository,
  ) {}

  execute(data: string[]): Promise<CompanyAddressEntity[]> {
    return this.companyAddressRepository.findManyWithCompanyId(data);
  }
}
