import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ProviderAddressEntity } from 'src/domain/entities';
import { IProviderAddressRepository } from 'src/repositories/provider-address';

@Injectable()
export class ProviderAddressFindOneUseCase
  implements IBaseUseCase<string, ProviderAddressEntity>
{
  constructor(
    private readonly providerAddressRepository: IProviderAddressRepository,
  ) {}

  async execute(data: string): Promise<ProviderAddressEntity> {
    const providerAddress = await this.providerAddressRepository.findById(data);

    if (!providerAddress)
      throw new HttpException(
        'provider address not found',
        HttpStatus.NOT_FOUND,
      );

    return providerAddress;
  }
}
