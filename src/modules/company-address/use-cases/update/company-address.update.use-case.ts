import { IBaseUseCase } from 'src/domain/base';
import { UpdateCompanyAddressInput } from 'src/domain/dtos';
import { CompanyAddressEntity } from 'src/domain/entities';
import { CompanyAddressFindOneUseCase } from '../find-one';
import { AddressUpdateUseCase } from 'src/modules/address/use-cases';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyAddressUpdateUseCase
  implements IBaseUseCase<UpdateCompanyAddressInput, CompanyAddressEntity>
{
  constructor(
    private readonly companyAddressFindOneUseCase: CompanyAddressFindOneUseCase,
    private readonly addressUpdateUseCase: AddressUpdateUseCase,
  ) {}

  async execute({
    id,
    ...updateAddressInput
  }: UpdateCompanyAddressInput): Promise<CompanyAddressEntity> {
    const companyAddress = await this.companyAddressFindOneUseCase.execute(id);

    // TODO: TALVEZ IMPLEMENTAR UMA VALIDAÇÃO DE CASO O ADDRESS AINDA EXISTA

    await this.addressUpdateUseCase.execute({
      id: companyAddress.addressId,
      ...updateAddressInput,
    });

    return companyAddress;
  }
}
