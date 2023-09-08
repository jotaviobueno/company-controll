import { IBaseUseCase } from 'src/domain/base';
import { UpdateCompanyAddressInput } from 'src/domain/dtos';
import { CustomerAddressEntity } from 'src/domain/entities';
import { CustomerAddressFindOneUseCase } from '../find-one';
import { AddressUpdateUseCase } from 'src/modules/address/use-cases';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerAddressUpdateUseCase
  implements IBaseUseCase<UpdateCompanyAddressInput, CustomerAddressEntity>
{
  constructor(
    private readonly customerAddressFindOneUseCase: CustomerAddressFindOneUseCase,
    private readonly addressUpdateUseCase: AddressUpdateUseCase,
  ) {}

  async execute({
    id,
    ...updateAddressInput
  }: UpdateCompanyAddressInput): Promise<CustomerAddressEntity> {
    const customerAddress =
      await this.customerAddressFindOneUseCase.execute(id);

    await this.addressUpdateUseCase.execute({
      id: customerAddress.addressId,
      ...updateAddressInput,
    });

    return customerAddress;
  }
}
