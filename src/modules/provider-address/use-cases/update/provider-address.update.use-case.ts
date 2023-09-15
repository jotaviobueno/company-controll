import { IBaseUseCase } from 'src/domain/base';
import { UpdateProviderAddressInput } from 'src/domain/dtos';
import { ProviderAddressEntity } from 'src/domain/entities';
import { AddressUpdateUseCase } from 'src/modules/address/use-cases';
import { Injectable } from '@nestjs/common';
import { ProviderAddressFindOneUseCase } from '../find-one';

@Injectable()
export class ProviderAddressUpdateUseCase
  implements IBaseUseCase<UpdateProviderAddressInput, ProviderAddressEntity>
{
  constructor(
    private readonly providerAddressFindOneUseCase: ProviderAddressFindOneUseCase,
    private readonly addressUpdateUseCase: AddressUpdateUseCase,
  ) {}

  async execute({
    id,
    ...updateAddressInput
  }: UpdateProviderAddressInput): Promise<ProviderAddressEntity> {
    const customerAddress =
      await this.providerAddressFindOneUseCase.execute(id);

    await this.addressUpdateUseCase.execute({
      id: customerAddress.addressId,
      ...updateAddressInput,
    });

    return customerAddress;
  }
}
