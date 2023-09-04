import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CompanyAddressEntity } from 'src/domain/entities';
import { ICompanyAddressRepository } from 'src/repositories/company-address';

@Injectable()
export class CompanyAddressFindOneUseCase
  implements IBaseUseCase<string, CompanyAddressEntity>
{
  constructor(
    private readonly companyAddressRepository: ICompanyAddressRepository,
  ) {}

  async execute(data: string): Promise<CompanyAddressEntity> {
    const companyAddress = await this.companyAddressRepository.findById(data);

    if (!companyAddress)
      throw new HttpException(
        'company address not found',
        HttpStatus.NOT_FOUND,
      );

    return companyAddress;
  }
}
