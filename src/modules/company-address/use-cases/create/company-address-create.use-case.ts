import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateAddressInput } from 'src/domain/dtos';
import { CompanyAddressEntity } from 'src/domain/entities';
import { AddressCreateUseCase } from 'src/modules/address/use-cases';
import { CompanyFindOneUseCase } from 'src/modules/company/use-cases';
import { ICompanyAddressRepository } from 'src/repositories/company-address';

@Injectable()
export class CompanyAddressCreateUseCase
  implements
    IBaseUseCase<
      CreateAddressInput & {
        companyId: string;
      },
      CompanyAddressEntity
    >
{
  constructor(
    private readonly companyFindOneUseCase: CompanyFindOneUseCase,
    private readonly addressCreateUseCase: AddressCreateUseCase,
    private readonly companyAddressRepository: ICompanyAddressRepository,
  ) {}

  async execute({
    companyId,
    ...createAddressInput
  }: CreateAddressInput & {
    companyId: string;
  }): Promise<CompanyAddressEntity> {
    const company = await this.companyFindOneUseCase.execute(companyId);

    const address = await this.addressCreateUseCase.execute(createAddressInput);

    const companyAddress = await this.companyAddressRepository.create({
      addressId: address.id,
      companyId: company.id,
    });

    console.log(companyAddress, address);

    return companyAddress;
  }
}
