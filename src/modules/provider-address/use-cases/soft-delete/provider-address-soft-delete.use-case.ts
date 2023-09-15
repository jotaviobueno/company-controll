import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ProviderAddressFindOneUseCase } from '../find-one';
import { AddressSoftDeleteUseCase } from 'src/modules/address/use-cases/soft-delete';
import { IProviderAddressRepository } from 'src/repositories/provider-address';

@Injectable()
export class ProviderAddressSoftDeleteUseCase
  implements IBaseUseCase<string, boolean>
{
  constructor(
    private readonly providerAddressRepository: IProviderAddressRepository,
    private readonly addressSoftDeleteUseCase: AddressSoftDeleteUseCase,
    private readonly providerAddressFindOneUseCase: ProviderAddressFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const providerAddress =
      await this.providerAddressFindOneUseCase.execute(data);

    await this.addressSoftDeleteUseCase.execute(providerAddress.addressId);

    const remove = await this.providerAddressRepository.softDelete(
      providerAddress.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
