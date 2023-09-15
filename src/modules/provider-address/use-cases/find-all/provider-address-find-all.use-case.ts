import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { ProviderAddressEntity } from 'src/domain/entities';
import { IProviderAddressRepository } from 'src/repositories/provider-address';

@Injectable()
export class ProviderAddressFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, ProviderAddressEntity[]>
{
  constructor(
    private readonly providerAddressRepository: IProviderAddressRepository,
  ) {}

  execute(data: PaginationOptionsInput): Promise<ProviderAddressEntity[]> {
    return this.providerAddressRepository.findAll(data);
  }
}
