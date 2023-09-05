import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ICompanyAddressRepository } from 'src/repositories/company-address';
import { CompanyAddressFindOneUseCase } from '../find-one';
import { AddressSoftDeleteUseCase } from 'src/modules/address/use-cases/soft-delete';

@Injectable()
export class CompanyAddressSoftDeleteUseCase
  implements IBaseUseCase<string, boolean>
{
  constructor(
    private readonly companyAddressRepository: ICompanyAddressRepository,
    private readonly addressSoftDeleteUseCase: AddressSoftDeleteUseCase,
    private readonly companyAddressFindOneUseCase: CompanyAddressFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const companyAddres = await this.companyAddressFindOneUseCase.execute(data);

    await this.addressSoftDeleteUseCase.execute(companyAddres.addressId);

    const remove = await this.companyAddressRepository.softDelete(
      companyAddres.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
