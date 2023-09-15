import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateAddressInput } from 'src/domain/dtos';
import { ProviderAddressEntity } from 'src/domain/entities';
import { AddressCreateUseCase } from 'src/modules/address/use-cases';
import { ProviderFindOneUseCase } from 'src/modules/provider/use-cases';
import { IProviderAddressRepository } from 'src/repositories/provider-address';

@Injectable()
export class ProviderAddressCreateUseCase
  implements
    IBaseUseCase<
      CreateAddressInput & {
        providerId: string;
      },
      ProviderAddressEntity
    >
{
  constructor(
    private readonly providerFindOneUseCase: ProviderFindOneUseCase,
    private readonly addressCreateUseCase: AddressCreateUseCase,
    private readonly providerAddressRepository: IProviderAddressRepository,
  ) {}

  async execute({
    providerId,
    ...data
  }: CreateAddressInput & {
    providerId: string;
  }): Promise<ProviderAddressEntity> {
    const provider = await this.providerFindOneUseCase.execute(providerId);

    const address = await this.addressCreateUseCase.execute(data);

    const customerAddress = await this.providerAddressRepository.create({
      addressId: address.id,
      providerId: provider.id,
    });

    return customerAddress;
  }
}
